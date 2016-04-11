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
import { page2Controller } from '../controllers/page2Controller';
import filter1 from '../filters/filter1';
import { HngDirective1 } from '../directives/HngDirective1';
import '../../css/page2.css';

let page2Module: ng.IModule;

page2Module = angular.module('app.page2Module', [])
    .controller("page2Controller", page2Controller)
    .filter("filter1", filter1)
    .directive("hngDirective1", HngDirective1.instance);

export default page2Module;

