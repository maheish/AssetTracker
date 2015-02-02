/*
  Navigation controller
 */

// Defining Navigation items and links
function addSuccessController($scope, $http, $routeParams, $location, Global, Utils, Regions, successStories, adddepartmentservice, getdepartmentservice, URL) {

    $scope.expand = {
        val: true
    };
    $scope.global = Global;

    $scope.headerText = "Congratulations Coach! You've identified a Teammate that has demonstrated significant performance and behavioral improvement. For this reason, you've decided to celebrate this Teammate's progress and success by completing and submitting a simple profile on the Teammate.";
    $scope.stepsTextDesktop = "Selecting a Teammate for this special recognition requires that you complete the following steps:";
    $scope.stepsTextDevice = "Check out the steps needed for Selecting a Teammate for this special recognition";


    $scope.steps = [{
        "title": "Testify to this Teammate's work ethic and commitment to creating experiences our customers love.",

    }, {
        "title": "Identify the area(s) of improvement.",

    }, {
        "title": "Work directly with your Teammate's Team Leader before submitting a Success Story.",

    }, {
        "title": "Obtain the teammate's permission to publish the Success Story on the Coach Community site.",

    }, {
        "title": "Identify other individuals who can testify to this Teammate's significant progress and success.",

    }, {
        "title": "Please ensure that you have a good high resolution picture of the Teammate and Team Leader to upload with your story. (We currently have coach photos on file)",

    }];

    /* Function to get the regions list*/
    $scope.findRegions = function(query) {
        $scope.regions = [];
        /* To show only regions assigned to the user*/
        Regions.query(function(_regions) {
            if ($scope.global.role == 0) {
                for (var i = 0, j = _regions.length; i < j; i++) {
                    if ($scope.global.region.indexOf(_regions[i].value) != -1) {
                        $scope.regions.push(_regions[i]);
                    } else
                        continue;
                }

            } else {
                $scope.regions = _regions;
            }
        });
    };

    $scope.findRegions();


    $scope.section1 = "Section 1: Coach, Teammate and Team Leader Information";
    $scope.section2 = "Section 2: Evidence of Success";
    $scope.section3 = "Section 3: Teammate Permission to Publish";
    $scope.section4 = "Section 4: Witness to Success";
    $scope.section5 = "Section 5: Add Your Success Story";
    $scope.section6 = "Section 6: Let Us See You Smile!";


    $scope.cfirstname = "Coach First Name:";
    $scope.clastname = "Coach Last Name: ";
    $scope.tmfirstname = "Teammate First Name:";
    $scope.tmlastname = "Teammate Last Name: ";
    $scope.tlfirstname = "Team Leader First Name:";
    $scope.tllastname = "Team Leader Last Name:";
    $scope.departmentText = "Department:";

    $scope.permission = "Do you have the Teammates Permission to post their story?";

    $scope.sessionDate = "What was the date of your Most Recent Action Planning Session:";
    $scope.witnessText = "Are there other individuals who can attest to this Teammate's improvement?";
    $scope.witnessQuestion = "If you answered \"Yes\" to the previous question, please provide their name, title and email address in the opten text field to the right:";
    $scope.storyLabel = "Please copy and paste your success story in 750 characters or less:";

    $scope.teammate_pic = "Please upload a picture of the Teammate:";
    $scope.teamleader_pic = "Please upload a picture of the Team leader:"; 
    $scope.user_pic = "Please upload a picture of the Coach:"; 
    $scope.teammate_pic_guide = "(Please follow this format: CoachName_TeammateName_Day_Month_Year)";
    $scope.teamleader_pic_guide = "(Please follow this format: CoachName_TeamleaderName_Day_Month_Year)";
    $scope.user_pic_guide = "(Please follow this format: CoachName_UserName_Day_Month_Year)";

    $scope.init = function() {
        $scope.getDepartment();

        if ($routeParams.storyId != "null") {
            successStories.get({
                storyId: $routeParams.storyId
            }, function(story) {
                $scope.story = story;
                $scope.bindModalData();

            });
        }


    };
    /* Function to get the departments list*/
    $scope.getDepartment = function() {
        getdepartmentservice.query(function(resDepartment) {
            $scope.department = resDepartment[0].departments;
        });
    }

    /* Function to bind data for edit stories*/
    $scope.bindModalData = function() {

        $scope.user = {
            firstname: $scope.story.firstname,
            lastname: $scope.story.lastname,
            teamfirstname: $scope.story.teamfirstname,
            teamlastname: $scope.story.teamlastname,
            teamleadfirstname: $scope.story.teamleadfirstname,
            teamleadlastname: $scope.story.teamleadlastname,
            department: $scope.story.department,
            sessiondate: $scope.story.sessiondate,
            permission: $scope.story.permission,
            witness: $scope.story.witness,
            region: $scope.story.region,

            witnessAnswer: $scope.story.witnessAnswer,
            story: $scope.story.story,
            teammatePicture: $scope.story.teammatePicture,
            teamleaderPicture: $scope.story.teamleaderPicture,
            userpicture: $scope.story.userpic,
            user: $scope.story.user
        };
    }


    $scope.user = {
        firstname: '',
        lastname: '',
        teamfirstname: '',
        teamlastname: '',
        teamleadfirstname: '',
        teamleadlastname: '',
        department: '',
        sessiondate: '',
        permission: '',
        witness: '',
        region: '',
        witnessAnswer: '',
        story: '',
        teammatePicture: '',
        teamleaderPicture: '',
        userpicture: '',
        user: ''

    };

    /* Function to create or upadte success story*/
    $scope.create = function() {

        $scope.submitted = true;
        // If form is invalid, return and let AngularJS show validation errors.
        if ($scope.sucessForm.$invalid) {
            alert("Please Fill in all the details");
            return;
        }

        if (($routeParams.storyId == "null") && ($scope.user.teammatepic == "" || $scope.user.teammatepic == undefined)) {
            alert('Pleas Upload Teammate Picture')
            return;
        } else {
            if ($scope.user.teammatepic != undefined) {
                if (!Utils.imagefileValidate($scope.user.teammatepic.name))
                    return;
            }
        }

        if (($routeParams.storyId == "null") && ($scope.user.teamleaderpic == "" || $scope.user.teamleaderpic == undefined)) {
            alert('Pleas Upload Team Leader Picture')
            return;
        } else {
            if ($scope.user.teamleaderpic != undefined) {
                if (!Utils.imagefileValidate($scope.user.teamleaderpic.name))
                    return;
            }
        }
        if (($scope.global.isAdmin) && ($scope.user.userpicture == '') && ($scope.user.userpic == "" || $scope.user.userpic == undefined)) {
            alert('Pleas Upload Coach Picture');
            return;

        } else {
            if ($scope.user.userpic != undefined) {
                if (!Utils.imagefileValidate($scope.user.userpic.name))
                    return;
            }
        }

        var fd = new FormData();
        fd.append('firstname', this.user.firstname);
        fd.append('lastname', this.user.lastname);
        fd.append('teamfirstname', this.user.teamfirstname);
        fd.append('teamlastname', this.user.teamlastname);
        fd.append('teamleadfirstname', this.user.teamleadfirstname);
        fd.append('teamleadlastname', this.user.teamleadlastname);
        fd.append('department', this.user.department);
        fd.append('sessiondate', '' + this.user.sessiondate);
        fd.append('permission', this.user.permission);
        fd.append('witness', this.user.witness);
        fd.append('region', this.user.region);
        fd.append('witnessAnswer', this.user.witnessAnswer);
        fd.append('story', this.user.story);
        fd.append('teammatePicture', $scope.user.teammatepic);
        fd.append('teamleaderPicture', $scope.user.teamleaderpic);
        fd.append('userpic', $scope.user.userpic);
        fd.append('user', $scope.global.user)

        if ($routeParams.storyId != "null") {
            //var endPoint='/updateStories';
            //var endPoint=URL.targetUrl+'/updateStories'; // Kawal commented for security issue
            var endPoint = URL.targetSecureUrl + '/updateStories';
            fd.append('id', $scope.story._id);
            //fd.append('userpic', $scope.user.userpic);
            $http.put(endPoint, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function(response) {
                    if ($routeParams.storyId != "null")
                        alert("Success Story has been updated");
                    else
                        alert("Success Story has been submitted");
                    $location.path("/");

                })
                .error(function() {
                    alert('Unable to save your story. pls Try again')
                });

        } else {
            //var endPoint='/stories';
            //var endPoint=URL.targetUrl+'/stories'; // Kawal commented for security issue
            var endPoint = URL.targetSecureUrl + '/stories';
            $http.post(endPoint, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function(response) {
                    if ($routeParams.storyId != "null")
                        alert("Success Story has been updated");
                    else
                        alert("Success Story has been submitted");
                    $location.path("/");
                })
                .error(function() {
                    alert('Unable to save your story. pls Try again')
                });

        }

    };

    /* Function to load the success story*/
    $scope.find = function(query) {

        successStories.query(query, function(stories) {
            $scope.stories = stories;
        });
    };


}
