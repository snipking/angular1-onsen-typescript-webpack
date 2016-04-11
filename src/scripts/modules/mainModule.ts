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
import { routeProvider } from '../routeConfig';
import { rootController } from '../controllers/rootController';
import { page1Controller } from '../controllers/page1Controller';
import { Service1 } from '../services/Service1';
import '../../css/app.css';

let cordovaApp: ng.IModule;

cordovaApp = angular.module('app.mainModule' ,[
    'ngRoute',
    'onsen',
    'onsen.directives',
    'oc.lazyLoad'
])
    .config(routeProvider)
    .service("service1", Service1)
    .controller("rootController", rootController)
    .controller("page1Controller", page1Controller)

export default cordovaApp;



