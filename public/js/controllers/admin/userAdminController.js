// To Create Blogs
function UserAdminController($scope,Users,Global) {

    /***********************************************************************************
    Static Contents for feedback Page
    ***********************************************************************************/
    $scope.global = Global;
    $scope.user = {
        username:'',
        userid:'',
        role:''
    };

    $scope.roles = [{
        "title": "Global Admin",
        "value": "2"
    }, {
        "title": "Asset Admin",
        "value": "1"
    }];


    /*Function to add admin user */
    $scope.create = function(index) {
        $scope.submitted = true;
        if ($scope.userform.$invalid) {
            return;
        }

        var _user = new Users($scope.user);

        _user.$save(function(response) {
            alert("User Added Succesfully");
            $('#userform').modal('hide');
            $scope.submitted = false;
            $scope.loadUser();
        });

    };

    /* To submit the form data*/
    $scope.loadUser = function(query) {

        Users.query({
            role: 1
        }, function(userObj) {
            $scope.assetAdminUsers = userObj[0].users;
        });
        
        Users.query({
            role: 2
        }, function(userObj) {
            $scope.globalAdminUsers = userObj[0].users;
        });
    };

    /*To remove feedback by admin*/
    $scope.remove = function(index, admin) {
        if (admin) {
            var user = $scope.globalAdminUsers[index];
            Users.delete({
                userId: user._id
            }, function() {
                $scope.globalAdminUsers.splice(index, 1);
                alert("User deleted successfully");
            });
        } else {
            var user = $scope.assetAdminUsers[index];
            Users.delete({
                userId: user._id
            }, function() {
                $scope.assetAdminUsers.splice(index, 1);
                alert("User deleted successfully");
            });

        }

    };

    $scope.loadUser();

}
