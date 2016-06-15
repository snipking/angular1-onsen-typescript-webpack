/* 
 * Copyright 2016 snipking.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import '../globalDefinition';

interface TranscludeDynamicControllerInterface extends ng.IScope {
    events: transcludeDynamicController;
    foo: string;
    bar: string;
    layout: string;
}

export class transcludeDynamicController {
    static $inject = ["$scope", "$log", "$ocLazyLoad", "$window"];

    constructor(private $scope: TranscludeDynamicControllerInterface, private $log: ng.ILogService, private $ocLazyLoad: oc.ILazyLoad, private $window: GlobalDefinitionInterface) {
        $scope.events = this;
        $scope.foo = "foo-slot1";
        $scope.bar = "bar-slot2";
        $scope.layout = "tplTopBottom";
    }
    
    popPage() {
        this.$log.debug("will pop page");
        this.$window.globalNavigator.popPage();
    }
    
    changeLayout() {
        if(this.$scope.layout === 'tplLeftRight') {
            this.$scope.layout = 'tplTopBottom'
        } else {
            this.$scope.layout = 'tplLeftRight'
        }
    }
}
