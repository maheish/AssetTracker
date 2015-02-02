function SuccessController($scope, $location, $timeout, $window, $route, Global, Analytics, successStories, ArchiveStories, URL) {

    Analytics.sendData();

    $scope.global = Global;
    $scope.adminControl = $scope.global.role == 1 || ($scope.global.isAdmin && ($scope.global.region.indexOf('Success Story') != -1));

    //$scope.imageUrl=URL.targetUrl; // Kawal commented for security issue
    $scope.imageUrl = URL.targetSecureUrl;
    $scope.count = 0;
    $scope.person = {
        story: '',
        storySelectedIndex: ''
    };

    $scope.pstroy = '';
    $scope.edit = false;
    $scope.deleteItem = false;

    /* Function to load the success story*/
    $scope.find = function(query) {

        successStories.query({
            approvestatus: 'approved',
            fliterRegion: $scope.global.region
        }, function(stories) {
            $scope.stories = stories;
        });
    };

    $scope.reload = function() {
        $route.reload();
    };

    /* Modal Dialog close event*/
    $('#PersonSuccessDialog').on('hidden.bs.modal', function(e) {

        if ($scope.edit == true) {
            $scope.edit = false
            window.location.href = '#!/addSuccess/' + $scope.pstroy._id
        } else if ($scope.deleteItem == true) {
            $scope.deleteItem = false;
            $window.location.reload();
        }
    });

    /* Function to edit the success story*/
    $scope.Editstory = function(pstory) {
            $scope.edit = true;
            $scope.pstroy = pstory;
        };
        /* Function to remove the success story*/
    $scope.remove = function(pstory) {
        $scope.edit = false;
        $scope.deleteItem = true;
        var story = pstory
        successStories.delete({
            storyId: story._id
        }, function() {
            $scope.stories.splice($scope.person.storySelectedIndex, 1);
        });

    };
    /* Function to store archives*/
    $scope.getArchives = function(query) {

        ArchiveStories.query(query, function(archiveMonths) {
            $scope.archiveMonths = archiveMonths;
        });
    };

}
