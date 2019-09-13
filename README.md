# file-delivery [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![standard][standard-image]][standard-url] [![forthebadge][60time-image]][60time-url]

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
### Pushing to Docker Hub:

```bash
$ docker build -t file-delivery .
$ docker images # look and find the hash you want
$ docker tag local-image:tagname reponame:tagname
$ docker push reponame:tagname
# EXAMPLE:
$ docker tag bfe06c2b5dea terrabrasilis/file-delivery:v1.0.0
$ docker push terrabrasilis/file-delivery
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

[travis-image]: https://img.shields.io/travis/Terrabrasilis/file-delivery/master.svg?style=for-the-badge
[travis-url]: https://travis-ci.com/terrabrasilis/file-delivery
[daviddm-image]: https://img.shields.io/david/Terrabrasilis/file-delivery.svg?style=for-the-badge
[daviddm-url]: https://david-dm.org/terrabrasilis/file-delivery
[coveralls-image]: http://img.shields.io/coveralls/Terrabrasilis/file-delivery/master.svg?style=for-the-badge
[coveralls-url]: https://coveralls.io/github/Terrabrasilis/file-delivery?branch=master
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=for-the-badge
[standard-url]: http://npm.im/standard
[60time-image]: https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg
[60time-url]: https://forthebadge.com