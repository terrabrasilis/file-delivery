# file-delivery [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 

## NODE VERSION

You should user Node version >= 12 

## Installation

```sh
$ yarn install
```

## Usage

then start the server

```sh
$ yarn start
```

## Unit tests

```sh
$ yarn test
```

Getting the coverage report:
```sh
$ yarn coverage
```

# API Usage:

## Download the file based on a public or admin access

Gets the file based on the Json Web Token that are sent in the requisition.

**URL** : `/download/:projectId/:frequency`

**Path Params** : 

	projectId: `['deter-cerrado', 'deter-amz']`	
	frequency: `['monthly', 'daily']`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None


### Success Responses

**Condition** : User gets the public file.

**Code** : `200 OK`

**Content** : `{type: public}`

```json
{
    "type": "public"
}

```

#### OR

**Condition** : User gets the admin file.

**Code** : `200 OK`

**Content** : `{type: admin}`

```json
{
    "type": "admin"
}

```

## License

MIT © [Paulo Luan](http://terrabrasilis.dpi.inpe.br)

[travis-image]: https://travis-ci.com/terrabrasilis/file-delivery.svg?branch=master
[travis-url]: https://travis-ci.com/terrabrasilis/file-delivery
[daviddm-image]: https://david-dm.org/terrabrasilis/file-delivery.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/terrabrasilis/file-delivery
[coveralls-image]: https://coveralls.io/repos/github/Terrabrasilis/file-delivery/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/Terrabrasilis/file-delivery?branch=master
