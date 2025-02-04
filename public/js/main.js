// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const assignmentinput = document.querySelector( "#assignmentname" ),
        classinput = document.querySelector( "#classname" ),
        deadlineinput = document.querySelector( "#deadline" ),
        json = { assignmentname: assignmentinput.value , classname: classinput.value, deadline: deadlineinput.value},
        body = JSON.stringify( json )

    const response = await fetch( "/submit", {
        method:'POST',
        body
    })

    const newAssignment = await response.json()
    console.log( "New Assignment:", newAssignment )

    const assignmentTable = document.querySelector("#datadisplay")
    const newRow = assignmentTable.insertRow(-1)

    newRow.insertCell(0).textContent = newAssignment.assignmentname
    newRow.insertCell(1).textContent = newAssignment.classname
    newRow.insertCell(2).textContent = newAssignment.deadline
    newRow.insertCell(3).textContent = newAssignment.priority

}

window.onload = function() {
    const button = document.querySelector("button");
    button.onclick = submit;
}
