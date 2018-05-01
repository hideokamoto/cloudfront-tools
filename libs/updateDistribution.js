const defaultCFClass = require('./cloudfront')

class UpdateDistribution {
  /**
   * constructor
   *
   * @param {Class} [CloudFront=defaultCFClass] - AWS.CloudFront object
   **/
  constructor(CloudFront = defaultCFClass) {
    this.cloudfront = new CloudFront()
  }
  /**
   * run update distribution config workflow
   *
   * @param {string} distributionId - CloudFront distribution id
   * @param {Object} updatedConfig - Update distribution config
   **/
  updateWorkflow(distributionId, updatedConfig) {
    return this.cloudfront.getDistribution(distributionId)
      .then(data => {
        const distribution = data.Distribution
        const config = this.mergeDistributionConfig(distribution.DistributionConfig, updatedConfig)
        const params = this.createUpdateDistributionParam(data, config)
        return this.cloudfront.updateDistribution(params)
      })
  }
  /**
   * Generate update CloudFront distribution params
   *
   * @param {object} data - cloudfront.getCloudFrontDistribution results
   * @param {object} config - updated distribution config
   * @return {object} update distribution param
   **/
  createUpdateDistributionParam (data, config) {
    const distribution = data.Distribution
    const params = {
      Id: distribution.Id,
      IfMatch: data.ETag,
      DistributionConfig: config
    }
    return params
  }
  /**
   * merge new distribution config
   *
   * @param {Object} distConfig - Distribution config
   * @param {Object} updatedConfig - updated config
   * @return {Object} merged config
   **/
  mergeDistributionConfig(distConfig, updatedConfig) {
    const config = distConfig
    console.log(JSON.stringify(distConfig))
    config.IsIPV6Enabled = 'true';
    return config
  }

}

module.exports = UpdateDistribution
