const assert = require('power-assert')
const UpdateDistribution  = require('../../../libs/updateDistribution')

const baseConfig = {
  "CallerReference": "1443455471141",
  "Aliases": {
    "Quantity": 0,
    "Items": []
  },
  "DefaultRootObject": "",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "Custom-example.org",
        "DomainName": "example.org",
        "OriginPath": "",
        "CustomHeaders": {
          "Quantity": 0,
          "Items": [

          ]
        },
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "match-viewer",
          "OriginSslProtocols": {
            "Quantity": 2,
            "Items": [
              "SSLv3",
              "TLSv1"
            ]
          },
          "OriginReadTimeout": 30,
          "OriginKeepaliveTimeout": 5
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "Custom-example.org",
    "ForwardedValues": {
      "QueryString": true,
      "Cookies": {
        "Forward": "all"
      },
      "Headers": {
        "Quantity": 0,
        "Items": [

        ]
      },
      "QueryStringCacheKeys": {
        "Quantity": 0,
        "Items": [

        ]
      }
    },
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0,
      "Items": [

      ]
    },
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "AllowedMethods": {
      "Quantity": 7,
      "Items": [
        "HEAD",
        "DELETE",
        "POST",
        "GET",
        "OPTIONS",
        "PUT",
        "PATCH"
      ],
      "CachedMethods": {
        "Quantity": 2,
        "Items": [
          "HEAD",
          "GET"
        ]
      }
    },
    "SmoothStreaming": false,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": false,
    "LambdaFunctionAssociations": {
      "Quantity": 0,
      "Items": [

      ]
    },
    "FieldLevelEncryptionId": ""
  },
  "CacheBehaviors": {
    "Quantity": 0,
    "Items": [

    ]
  },
  "CustomErrorResponses": {
    "Quantity": 0,
    "Items": [

    ]
  },
  "Comment": "",
  "Logging": {
    "Enabled": true,
    "IncludeCookies": false,
    "Bucket": "s3.example.com",
    "Prefix": "wp-"
  },
  "PriceClass": "PriceClass_All",
  "Enabled": true,
  "ViewerCertificate": {
    "CloudFrontDefaultCertificate": true,
    "MinimumProtocolVersion": "TLSv1",
    "CertificateSource": "cloudfront"
  },
  "Restrictions": {
    "GeoRestriction": {
      "RestrictionType": "none",
      "Quantity": 0,
      "Items": [

      ]
    }
  },
  "WebACLId": "",
  "HttpVersion": "http1.1",
  "IsIPV6Enabled": false
}

describe('libs/updateDistribution.js', () => {
  const c = new UpdateDistribution()
  describe('#mergeDistributionConfig()', () => {
    it('should update IsIPV6Enabled param to be true when given valid update params', () => {
      const updateConfig = {
        IsIPV6Enabled: true
      }
      const newConfig = c.mergeDistributionConfig(baseConfig, updateConfig)
      assert.equal(newConfig.IsIPV6Enabled, true)
    })
    it('should update IsIPV6Enabled param to be true when given valid update params', () => {
      const updateConfig = {
        HttpVersion: 'http2'
      }
      const newConfig = c.mergeDistributionConfig(baseConfig, updateConfig)
      assert.equal(newConfig.HttpVersion, 'http2')
    })
  })
})
