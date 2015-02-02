// To Create Blogs
function UserAdminController($scope, $window, $location, Users, Regions, Global, Analytics) {

    Analytics.sendData();

    /***********************************************************************************
    Static Contents for feedback Page
    ***********************************************************************************/
    $scope.global = Global;
    $scope.user = {};
    $scope.dialogTitle = "";
    $scope.editableItem = {};
    $scope.editableFlag = false;

    $scope.roles = [{
        "title": "User",
        "value": "0"
    }, {
        "title": "Global Admin",
        "value": "1"
    }, {
        "title": "Regional Admin",
        "value": "2"
    }];

    $scope.selectedRegion = [];


    $scope.toggleSelection = function toggleSelection(region) {
        var tempRegion = region.replace(/ /g, '');
        //alert(tempRegion);
        var idx = $scope.selectedRegion.indexOf(tempRegion);

        // is currently selected
        if (idx > -1) {
            $scope.selectedRegion.splice(idx, 1);
        }

        // is newly selected
        else {
            //alert($scope.selectedRegion.length);
            if ($scope.selectedRegion.length == 1 && $scope.selectedRegion[0] == '') {
                $scope.selectedRegion = [];
            }
            $scope.selectedRegion.push(region);
        }
    };


    /*Function to add local event to the selected region*/
    $scope.createRegions = function(index) {

        if ($scope.regionform.$invalid) {
            return;
        }

        var region = new Regions({
            city: $scope.city,
            country: $scope.country,
        });

        region.$save(function(response) {
            alert("Region Added Succesfully");
            $('#regionform').modal('hide');
            $window.location.reload();
        });

    };

    /* To submit the form data*/
    $scope.findRegions = function(query) {

        Regions.query(function(_regions) {

            var temp = _regions;

            $scope.regionsdropdown = temp.slice();

            $scope.regionsdropdown.push({
                "city": "Success Story",
                "value": "Success Story"
            });

            $scope.regions = temp;

        });



    };

    /*To remove feedback by admin*/
    $scope.removeRegion = function(index, admin) {

        var region = $scope.regions[index];
        Regions.delete({
            regionId: region._id
        }, function() {
            $scope.regions.splice(index, 1);
            alert("Region deleted successfully");
            $window.location.reload();
        });


    };

    /*Function to add local event to the selected region*/
    $scope.create = function(index) {
        $scope.submitted = true;
        if ($scope.userform.$invalid) {
            return;
        }

        if ($scope.user.role == 2 && $scope.selectedRegion.length < 1) {
            alert("Please select regions for the admin");
            return;
        }



        var _user = new Users({
            username: $scope.user.username,
            role: $scope.user.role,
            region: $scope.selectedRegion
        });

        _user.$save(function(response) {
            alert("User Added Succesfully");
            $('#userform').modal('hide');
            $scope.find();
            $scope.submitted = false;
        });

    };



    /* To submit the form data*/
    $scope.find = function(query) {

        Users.query({
            role: 0
        }, function(userObj) {

            $scope.testUsers = userObj[0].users;
        });
        
        Users.query({
            role: 1
        }, function(userObj) {
            $scope.adminUsers = userObj[0].users;
        });
    };

    /*To remove feedback by admin*/
    $scope.remove = function(index, admin) {
        if (admin) {
            var user = $scope.adminUsers[index];
            Users.delete({
                userId: user._id
            }, function() {
                $scope.adminUsers.splice(index, 1);
                alert("User deleted successfully");
            });
        } else {
            var user = $scope.testUsers[index];
            Users.delete({
                userId: user._id
            }, function() {
                $scope.testUsers.splice(index, 1);
                alert("User deleted successfully");
            });

        }

    };

    $scope.changeChatPermission = function(item) {

        var user = item;
        user.chat_status = item.chat_status == 0 ? 1 : 0;

        Users.update({
            userId: item._id
        }, item, function(response) {
            alert("Updated successfully");

        });

    };

    $scope.update = function(item) {

        if ($scope.user.role == 2 && $scope.selectedRegion.length < 1) {
            alert("Please select  regions for the admin");
            return;
        }

        var user = $scope.user;
        user.region = $scope.selectedRegion;
        Users.update({
            userId: user._id
        }, user, function(response) {
            alert("Updated successfully");
            $scope.submitted = false;
            $scope.editableFlag = false;
            $('#userform').modal('hide');
            $scope.find();
            $('#usernameText').attr("disabled", false);

        });

    };

    $scope.edit = function(item) {
        //$scope.user=item;
        $scope.user.username = item.username;
        $scope.user.role = item.role;
        $scope.user._id = item._id;
        if (item.region.length)
            $scope.selectedRegion = item.region.slice();
        $scope.editableFlag = true;
        $scope.dialogTitle = "Edit User";
        $('#usernameText').attr("disabled", "disabled");


    };
    $scope.addUser = function() {
        $scope.dialogTitle = "Add User";
        $scope.user = {};
    };
    $('#userform').on('hide.bs.modal', function(e) {
        $scope.selectedRegion = [];
        $scope.editableFlag = false;
        $('#usernameText').attr("disabled", false);
    });

    $scope.findRegions();

}
