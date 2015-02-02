function CategoryController($scope, $route, $location, $routeParams, Global, addcategoryservice, getcategoryservice) {

    $scope.newCategory = '';
    $scope.categories = [{
        val: "category1"
    }, {
        val: "category2"
    }, {
        val: "category3"
    }, {
        val: "category4"
    }, {
        val: "category5"
    }, {
        val: "category6"
    }, {
        val: "no-filter"
    }];

    $scope.init = function() {
        $scope.getCategory();

    };

    $scope.saveCategory = function() {

        var cateservice = new addcategoryservice({
            /*"category":[{val:"category1"},
                {val:"category2"},
                {val:"category3"},
                {val:"category4"},
                {val:"category5"},
                {val:"category6"},
                {val:"no-filter"}]*/
            "category": $scope.categories

        });
        cateservice.$save(function(response) {
            $scope.getCategory();
        });

    };
    $scope.addCategory = function() {
        if ($scope.newCategory === "") {
            return false;
        }

        $scope.categories.push({
            val: $scope.newCategory
        });
    };

    $scope.getCategory = function() {
        getcategoryservice.query(function(resCategory) {

            $scope.categories = resCategory[0].category;

        });
    };

    //$('#editCategoryDialog').hasClass('in') //to check model is open or not

    $('#editCategoryDialog').on('show.bs.modal', function(e) {
        $scope.getCategory();
    });


    $scope.getCategory();

}

function EditCategoryController($scope, $route, $location, $routeParams, Global) {

    $scope.editCategory = '';
    $scope.editorEnabled = false;

    $scope.disableEditor = function() {
        $scope.editorEnabled = false;
    };
    $scope.enableEditor = function() {
        $scope.editorEnabled = true;

        $scope.editCategory = $scope.category.val;
    };

    $scope.save = function() {
        if ($scope.editCategory === "") {
            return false;
        }

        $scope.category.val = $scope.editCategory;
        $scope.disableEditor();
    };

}
