$(document).ready(function () {

    // process the form
    $('#sendButtopn').click(() => {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        const formData = {
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
        }

        const requestData = JSON.stringify(formData)

        $.ajax({
                type: 'POST', 
                url: 'api/user', 
                data: requestData,
                dataType: 'json',
                contentType: 'application/json',
            })
            .done(successHandler)
            .fail(errorHandler)
    })

})

function successHandler(data) {
    const serverData = JSON.stringify(data)
    $('#output').text(`Server response: ${serverData}`)
}

function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}