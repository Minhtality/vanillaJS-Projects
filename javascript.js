const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', () => {
        //get tasks from local storage
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(task => {
            //create the li
            const li = document.createElement('li');
            // insert text in li
            li.appendChild(document.createTextNode(task));
            //insert class into li
            li.className = 'collection-item'
            //create new link
            const link = document.createElement('a');
            //link class
            link.className = 'delete-item secondary-content'
            //insert into link for inner html for icon
            link.innerHTML = '<i class="fa fa-remove"></i>'
            //shove link to li
            li.appendChild(link)
            //shove li into ul 
            taskList.appendChild(li)
        });
    });

    //add to do
    form.addEventListener('submit', event => {
        if (taskInput.value === '') {
            alert('Hey, add something')
        } else {
            //create the li
            const li = document.createElement('li');
            // insert text in li
            li.appendChild(document.createTextNode(taskInput.value));
            //insert class into li
            li.className = 'collection-item'
            //create new link
            const link = document.createElement('a');
            //link class
            link.className = 'delete-item secondary-content'
            //insert into link for inner html for icon
            link.innerHTML = '<i class="fa fa-remove"></i>'
            //shove link to li
            li.appendChild(link)
            //shove li into ul 
            taskList.appendChild(li)
            //store in local storage
            storeTaskInLocalStorage(taskInput.value)

            taskInput.value = '';
            event.preventDefault();
        }
    });

    //local storage function (add tasks to local storage)
    const storeTaskInLocalStorage = task => {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }


    //remove todo event
    taskList.addEventListener('click', event => {
        let todoAnchor = event.target.parentElement;
        if (todoAnchor.classList.contains('delete-item')) {
            if (confirm('u sure about this?')) {
                todoAnchor.parentElement.remove()

                //remove from local storage
                removeTaskFromLS(todoAnchor.parentElement)
            }
        } else {
            todoAnchor.classList.toggle('strike');
        }
    });

    //remove from local storage
    const removeTaskFromLS = taskItem => {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach((task, index) => {
            if (taskItem.textContent === task) {
                tasks.splice(index, 1);
            }

        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //clear all todos event
    clearBtn.addEventListener('click', () => {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        // call function clear all tasks from local storage
        clearAllTasks();
    });
    // clear all from local storage
    const clearAllTasks = () => {
        localStorage.clear();
    }

    //filter thru tasks
    filter.addEventListener('keyup', event => {
        let collectionItems = document.querySelectorAll('.collection-item');
        const textInput = event.target.value.toLowerCase();

        collectionItems.forEach(item => {
            const firstTask = item.firstChild.textContent;
            if (firstTask.toLowerCase().indexOf(textInput) != -1) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        })
    })
}




