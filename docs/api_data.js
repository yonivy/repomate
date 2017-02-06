define({ "api": [  {    "type": "get",    "url": "/repos/:owner/:repo/files/exists/:filepath",    "title": "exists",    "name": "exists",    "group": "Files",    "description": "<p>Detect file existence in a repository</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "owner",            "description": "<p>The owner of the repo (GitHub user name)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "repo",            "description": "<p>The repository name</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "filepath",            "description": "<p>Full file path to search for</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "exists",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "app/routes.js",    "groupTitle": "Files"  },  {    "type": "get",    "url": "/repos/:owner/:repo/files/ext/:ext",    "title": "find by extension",    "name": "findByExtension",    "group": "Files",    "description": "<p>Find all files with a given extension in a repository</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "owner",            "description": "<p>The owner of the repo (GitHub user name)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "repo",            "description": "<p>The repository name</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ext",            "description": "<p>The file extension to search for</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "paths",            "description": "<p>A list of all the found file paths</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "app/routes.js",    "groupTitle": "Files"  },  {    "type": "get",    "url": "/repos/:owner/:repo/files/name/:name",    "title": "find by name",    "name": "findByName",    "group": "Files",    "description": "<p>Find all files with a given name in a repository</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "owner",            "description": "<p>The owner of the repo (GitHub user name)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "repo",            "description": "<p>The repository name</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>The file name to search for</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "paths",            "description": "<p>A list of all the found file paths</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "app/routes.js",    "groupTitle": "Files"  }] });
