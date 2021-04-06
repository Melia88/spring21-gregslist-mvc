import {ProxyState} from "../AppState.js"
import {jobsService} from "../Services/JobsService.js"

function _draw(){
  let jobs = ProxyState.jobs
  let template = ''
  jobs.forEach(job => {
    template += job.Template
  })
  document.getElementById('jobs').innerHTML = template
}

export default class JobsController{
  constructor(){
    // the .on listener/observer is what is actually making it show up on the screen.
    ProxyState.on('jobs',_draw)
    // this.getJobs is calling the getJobs methon from inside JobsService.
    this.getJobs()
  }
// we made the getJobs() method here so we can use try and catch and in the constructor we can then use this.getJobs() instead of the not as safe jobsService.getJobs()
  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error(error)
    }
  }

  // create newJob here pulls out the info from the form that service needs/wants
  async createJob() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let newJob = {
        // @ts-ignore
        company: form.company.value,
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        jobTitle: form.jobTitle.value,
        // @ts-ignore  this converts the string to a number
        hours: Number(form.hours.value),
        // @ts-ignore
        rate: form.rate.value,
        // @ts-ignore
        id: form.id.value
      }
      // whatever I pass in the .createJob(in here) must also be passed in the services initial async createJob(in here) Method
      await jobsService.createJob(newJob)

      // @ts-ignore
      form.reset()

      $('#new-job-form').modal('hide')
    } catch (error) {
      console.error(error)
    }
}

deleteJob(id) {
  try {
    jobsService.deleteJob(id)
  } catch (error) {
    console.error(error)
  }
}

  apply(id) {
    jobsService.apply(id)
}
}