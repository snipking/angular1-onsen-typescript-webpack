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
import cordovaApp from '../modules/mainModule';
/**
 * can require pages with file-loader @ webpack
 * or let gulp go through html files
 */ 
//require('file?name=pages/[name].[ext]!../../pages/page2.html');

interface Page2ControllerInterface extends ng.IScope {
    events: page2Controller;
}

export class page2Controller {
    static $inject = ["$scope", "$log", "$window"];

    constructor(private $scope: Page2ControllerInterface, private $log: ng.ILogService, private $window: GlobalDefinitionInterface) {
        $scope.events = this;
    }

    popPage() {
        this.$log.debug("will pop page");
        this.$window.globalNavigator.popPage();
    }
}


