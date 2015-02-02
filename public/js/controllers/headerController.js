/*
 Navigation controller
 */


// Defining Navigation items and links
function HeaderController($scope, $location, Global) {

    /***********************************************************************************
    Static Contents for Naviagtion items
    ***********************************************************************************/
    $scope.global = Global;
    $scope.adminControl = $scope.global.role == 1 || ($scope.global.isAdmin && ($scope.global.region.indexOf('Success Story') != -1));


    /***********************************************************************************
    Static Content For Feedback Form
    ***********************************************************************************/

    $scope.formHeaderText = "Feedback Form";
    $scope.firstnameText = "Your First Name:";
    $scope.lastnameText = "Your Last Name: ";
    $scope.departmentText = "Your Department:";
    //$scope.feedbackText = "Please share your feedback: ";

    /***********************************************************************************
    Variable Declarations For Feeback Form
    ***********************************************************************************/
    $scope.user = {
        firstname: '',
        lastname: '',
        department: '',
        feedback: ''
    };

    /***********************************************************************************
    Functionalities for Feedback Form
    ***********************************************************************************/

    /* To reset the form data*/
    $scope.reset = function() {
        $scope.user = {
            firstname: '',
            lastname: '',
            department: '',
            contents: ''
        };
    };

    /* Function To get Departments for the feedback form */
    $scope.getDepartment = function() {
        getdepartmentservice.query(function(resDepartment) {
            $scope.department = resDepartment[0].departments;
        });
    };

    $('#feedback').on('show.bs.modal', function(e) {
        $scope.getDepartment();

    });

    

}
