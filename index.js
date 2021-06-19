//https://crudcrud.com/api/c2973b6513d848be9a0c8b1c2d9b91be
const url = "https://crudcrud.com/api/5299befc1cbf4ed6b531c70e3c38ec28/school";


function myPost( url, school) {
    return $.ajax( {
        url:url,
        type: "POST",
        dataTyper: "json",
        data: JSON.stringify(),
        contentType: "application/json"
    });
}

function myPut(url, school) {
    return $.ajax( {
        url: url, 
        type: "PUT",
        DATA:JSON.stringify(school),
        contentType: "application/json"
    });
}

function makeInitial(){
    let dar = new School("Dar");
    let math = new subject("math")
    let Bob = new professor
}


class School {
    constructor(name) {
        this.name = name;
        this.subject = [];
    }

    addSubject (name, professor) {
        this.subject.push(new subject(name, professor));
    }
}

class subject {
    constructor (name, professor) {
        this.name = name;
        this.professor = professor;
    }
}

class SchoolService {
    
    static getAllSchools() {
        return $.get(this.url);
    }

    static getSchool(id) {
        return $.get(this.url + `/${id}`);
    }

    static createSchool(school) {
        return $.post(this.url, school);
    }

    static updateSchool(school) {
        return $.ajax({
            url: this.url + `/${school._id}`,
            //dataType: "json",
            data: JSON.stringify(school),
            contentType: "application/json",
            type: "PUT"
        });
    }

    static deleteSchool (id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: "DELETE"
        });
    }
}

class DOMManager {
    static Schools;

    static getAllSchools() {  //added parenthesis around schools
        SchoolService.getAllSchools().then(
            (schools) => this.render(schools)
        );
    }

    static createSchool(name) { //removed new School from below
        SchoolService.createSchool(name)
        .then( () => {
            return SchoolService.getAllSchools();
        })
        .then((schools) => this.render(schools));
    }

    static deleteSchool(id) {
        SchoolService.deleteSchool(id) 
        .then(() => {
            return SchoolService.getAllSchools();
        })
        .then((schools) => this.render(schools));
    }

    static addSubject (id) {
        for (let school of this.schools) {
            if (school.id == id) {
            school.subjects.push(new subject($(`#${school.id}-subject-name`).val(), $(`#${school.id}-subject-professor`).val()));
            SchoolService.updateSchool(school) 
            .then (() => {
                return SchoolService.getAllSchools();
            })
            .then((schools) => this.render(schools));
            }
        }
    }

    static deleteSchool(schoolId, subjectId) {
        for (let school of this.schools) {
            if (school._id == schoolId) {
                for (let subject of school.subject) {
                    if (subject._id == subjectId) {
                        school.subject.splice(school.subject.indexOf(subject), 1);
                        SchoolService.updateSchool(school)
                        .then(() => {
                            return SchoolService.getAllSchools();
                        })
                        .then((schools) => this.render(schools));
                    }
                }
            }
        }
    }

    static render(schools) {
        this.schools = schools;
        $('#app').empty();
        for (let school of schools) {
            $("#app").prepend (
            `<div id="${school._id}" class="card">
                <div class="card-header">
                    <h2> ${school.name} </h2>
                    <button class= "btn btn-danger" onclick="DOMManager.deleteSchool ('${school._id}')"> Delete</button>
                </div>  
                <div class="card-body">
                    <div class = "card">
                     <div class="row>
                        <div class="col-sm">
                            <input type="text" id="${school.id}-subject-name" class="form-control" placeholder = "Subject Name">
                        </div> <br>
                        <div class="col-sm">
                            <input type="text" id="${school.id}-subject-professor" class="form-control" placeholder = "Subject Professor">
                        </div>
                    </div>
                    <button id="${school._id}-new-subject" onclick="DOMManager.addSubject('${school._id}')" class="mt-3 btn btn-primary form-control">Add</button>
                </div>
            </div><br>`
            );

            for (let subject of school.subjects) {
                $(`#${school._id}`).find('.card-body').append(
                    `<p>
                    <span id="name-${subject._id}"><strong>Name: </strong> ${subject.name}</span>
                    <span id="professor-${subject._id}"><strong>Professor: </strong> ${subject.professor}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deletesubject('${school._id}', '${subject._id}')">Delete subject</button>`
                )
            }
        }
    }
}

$(`#create-new-school`).click(() => {
    DOMManager.createSchool($('#new-school-name').val());
    $(`#new-school-name`).val('');
});

DOMManager.getAllSchools();