/*
 Home controller
 */


// Defining contents to be displayed in home page
function HomeController($scope,$http,Global,Assets) {

    $scope.tinymceOptions = {
        resize: false,
        theme: "modern",
        plugins: 'advlist autolink lists link charmap anchor',
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link",
        toolbar2: "print preview media | forecolor backcolor emoticons",
        image_advtab: true,
        height: "300px",
        width: "500px"
    };

    $scope.ostype='';
    //$scope.mobileObject = [{devicename:'iPhone6',ostype:'iOS'},{devicename:'S3',ostype:'Android'}];

    $scope.loadAssets = function(index) {
        Assets.query({
           // 'eventId': $scope.events[index]._id
        }, function(response) {
            $scope.assetDataObject=response;
        });
    };
    $scope.loadAssets();
    $(".btn-group > .btn").click(function(){
        $(".btn-group > .btn").removeClass("active");
        $(this).addClass("active");
    });
}
