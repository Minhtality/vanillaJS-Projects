const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {

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
            taskInput.value = '';
            event.preventDefault();
        }
    });

    //remove todo event
    taskList.addEventListener('click', event => {
        let todoAnchor = event.target.parentElement;
        if (todoAnchor.classList.contains('delete-item')) {
            if (confirm('u sure about this?')) {
                todoAnchor.parentElement.remove()
            }
        } else {
            todoAnchor.classList.toggle('strike');
        }
    })
    //clear all todos event
    clearBtn.addEventListener('click', () => {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    })
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




