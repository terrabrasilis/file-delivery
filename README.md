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

# Deploy Info

### Build and Run your image
From your Node.js app project folder launch those commands:

```bash
$ docker build -t file-delivery .
$ docker run -p 9000:9000 file-delivery
```

## Useful commands

Command | Description
--------|------------
```$ docker exec -it <container-id> pm2 monit``` | Monitoring CPU/Usage of each process
```$ docker exec -it <container-id> pm2 list``` | Listing managed processes
```$ docker exec -it <container-id> pm2 show``` | Get more information about a process
```$ docker exec -it <container-id> pm2 reload all``` | 0sec downtime reload all applications
```$ docker exec -it <container-id> pm2 logs --format``` | see all applications logs
```$ docker exec -it <container-id> pm2 flush``` | flush applications logs

## License

MIT © [Paulo Luan](http://terrabrasilis.dpi.inpe.br)

[travis-image]: https://travis-ci.com/terrabrasilis/file-delivery.svg?branch=master
[travis-url]: https://travis-ci.com/terrabrasilis/file-delivery
[daviddm-image]: https://david-dm.org/terrabrasilis/file-delivery.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/terrabrasilis/file-delivery
[coveralls-image]: https://coveralls.io/repos/github/Terrabrasilis/file-delivery/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/Terrabrasilis/file-delivery?branch=master
