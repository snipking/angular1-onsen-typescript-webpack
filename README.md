# angular1-onsen-webpack

[![Dependency Status](https://david-dm.org/snipking/angular1-onsen-typescript-webpack/status.svg)](https://david-dm.org/snipking/angular1-onsen-typescript-webpack#info=dependencies) [![devDependency Status](https://david-dm.org/snipking/angular1-onsen-typescript-webpack/dev-status.svg)](https://david-dm.org/snipking/angular1-onsen-typescript-webpack#info=devDependencies)

A seed template for angular1 & onsenui & typescript & webpack project

This project is a starting point for building Angular 1.x applications with onsenui, typescript and webpack. Also for further

1. [angular1-onsen](https://github.com/snipking/angular1-onsen.git)  
2. [angular1-onsen-webpack](https://github.com/snipking/angular1-onsen-webpack.git)  
3. angular1-onsen-typescript-webpack  

learning course.

>Warning: Make sure you're using the latest version of Node.js and NPM

### Quick start

> Clone/Download the repo

```bash
# clone repo
$ git clone https://github.com/snipking/angular1-onsen-typescript-webpack.git angular1-onsen-typescript-webpack

# change directory to app root
$ cd angular1-onsen-typescript-webpack

# install the dependencies with npm
$ npm install

# install the dependencies with bower
$ bower install

# run and watch changes
$ gulp run-dev
```

If everything goes right, chrome browser will open with url [http://localhost:8384/index.html](http://localhost:8384/index.html)
otherwise you should open it manually.

# Table of Contents

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
* [License](#license)

# Getting Started

## Dependencies

What you need to run this app:
* `node` and `npm`

## Installing

* `npm install` to install build environment dependencies
* `bower install` to install javascript library dependencies

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
gulp run-dev
```

It will start a local server using `webpack-dev-server`, and scripts build with webpack will watch, build (in-memory), and reload by it; other resources will watch by gulp. Chrome browser will open with url `http://localhost:8384/index.html`.

## Developing

### Build files

* developing build:  
```bash
gulp build-dev
```
* production build:  
```bash
gulp build-prod
```
* clean distribution (www) folder:  
```bash
gulp clean
```
* run and watch changes:  
```bash
gulp run-dev
```

### IDE

This project build with NetBeans 8.1, so the `nbproject` folder included. This is not required and if you are using other IDE, just delete it.

## Testing

#### 1. Unit Tests

_TODO_

# License

[APACHE](/LICENSE)
