# CloudFront tools
CLI tool to update cloudfront distribution config more easly.

## Getting started

```
$ npm i -g cf-tools
$ cf-tools -h
```

## Commands

```
$ cf-tools -h

  Usage: cli [options] [command]

  Options:

    -v, --version     output the version number
    -h, --help        output usage information

  Commands:

    update [options]  Update CloudFront distributions
```

### update

```
$ cf-tools update -h

  Usage: update [options]

  Update CloudFront distributions

  Options:

    -i, --distribution_id <distribution_id>  CloudFront distribution id
    -d, --body <config>                      updated distribution config
    -h, --help                               output usage information
```

#### Example

```
$ cf-tools update -i EXXXXXX -d '{"IsIPV6Enabled": true}'
...
[Success]: Start to update the distribution - EXXXXXX
```

## Development

```
$ git clone https://github.com/hideokamoto/cloudfront-tools.git
$ npm i
$ ./cli -h
```

## Feature
- [Inprogress] add `update-all` command to update all distributions
