const chalk = require('chalk')
const BbPromise = require('bluebird')
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
   * @param {Object} updateConfig - Update distribution config
   **/
  updateWorkflow(distributionId, updateConfig) {
    return this.cloudfront.getDistribution(distributionId)
      .then(data => {
        const distribution = data.Distribution
        const config = this.mergeDistributionConfig(distribution.DistributionConfig, updateConfig)
        const params = this.createUpdateDistributionParam(data, config)
        console.log(chalk.green('[Inprogress]: new distribution config \n'), params)
        return this.cloudfront.updateDistribution(params)
      })
  }
  /**
   * Update all CloudFront distributions
   * @param {Object} updateConfig - Update distribution config
   **/
  updateAllDistribution(updateConfig) {
    return this.updateAllDistributionWorkflow(updateConfig)
  }
  /**
   * Update all CloudFront distributions
   * @param {Object} updateConfig - Update distribution config
   * @param {string} [marker=''] - next marker for listDistribution api
   **/
  updateAllDistributionWorkflow(updateConfig, marker = '') {
    return this.cloudfront.listDistribution(marker)
      .then(data => {
        const listData = data.DistributionList || {}
        if (!this.shouldCallResursiveWf(listData)) return BbPromise.resolve(true)
        return this.updateAllDistributionWorkflow(updateConfig, listData.NextMarker)
      })
  }
  /**
   * Should call recursive the updateAllDistributionWorkflow() function
   *
   * @param {Object} listData - cloudfront.listDistribution response
   * @return bool - if true, should call  recursive
   **/
  shouldCallResursiveWf(listData = {}) {
    if (Object.keys(listData).length === 0) return false
    if (listData.NextMarker && listData.NextMarker !== '') return true
    return false
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
   * @param {Object} updateConfig - updated config
   * @return {Object} merged config
   **/
  mergeDistributionConfig(distConfig, updateConfig) {
    const config = Object.assign({}, distConfig, updateConfig)
    return config
  }

}

module.exports = UpdateDistribution
