const url = "https://crudcrud.com/api/c2973b6513d848be9a0c8b1c2d9b91be/school";
let schools = [];


function myPost( url, school) {
    return $.ajax( {
        url:url,
        type: "POST",
        data: school,
        data: JSON.stringify(school),
        contentType: "application/json"
    });
}

function getSchools( url) {
    return $.get(url, function (data, textStatus, jqXHR) {  // success callback
       schools = data;
       showSchool();
    });
}


function myPut(url, school) {
    return $.ajax( {
        url: url, 
        type: "PUT",
        data:JSON.stringify(school),
        contentType: "application/json"
    });
}

function deleteSchool (id) {
    return $.ajax({
        url: url + `/${id}`,
        type: "DELETE"
    });
}


function showSchool () {
    console.log(schools)
        this.schools = schools;
        $('#app').empty();
        for (let school of schools) {
            $("#app").prepend (
            `<div id="${school._id}" class="card">
                <div class="card-header">
                    <h2> ${school.name} </h2>
                    <button class= "btn btn-danger" onclick="deleteData('${school._id}')"> Delete</button>
                </div> 
            </div><br>`
            );
        }

}


$('#create-new-school').click((e)=> {
    e.preventDefault();
    let school = $('#new-school-name').val();
    school = {"name" : school}
    const response = myPost(url, school);
    response.done(()=> {
        getSchools(url);
    })

});

function deleteData(id) {
    const response = deleteSchool(id);
    response.done(()=> {
        getSchools(url);
    })
}

$( document ).ready(function() {
   getSchools(url);
});
