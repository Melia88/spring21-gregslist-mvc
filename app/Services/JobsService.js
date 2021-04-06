import {ProxyState} from "../AppState.js"
import Job from "../Models/Job.js"
import {api} from "../Services/AxiosService.js"

class JobsService{
  async getJobs(){
    // res is short for response
    let res = await api.get('jobs')
    console.log(res.data);
    ProxyState.jobs = res.data.map(j => new Job(j))
  }
  
  async createJob(newJob){
    // NOTE post creates data in the server, the first argument to extend the url the second is the data is the body of the new job to send
    let res = await api.post('jobs', newJob)
    console.log(res.data)
    
    
    // the lazy way which makes one more network request from the server, can potentially slow things down a bit
    // this.getCars()
    
    // the longhand way
    res.data.id = res.data._id
    let job = new Job(res.data)
    ProxyState.jobs = [...ProxyState.jobs, job]
  }
  
  async deleteJob(id) {
    await api.delete('jobs/' + id)
    ProxyState.jobs = ProxyState.jobs.filter(job => job.id != id)
  }


  apply(id) {
    let job = ProxyState.jobs.find(job => job.id === id)
    // step 2: modify it
    job.rate += 10

    // step 3: send update to server
    // await api.put('jobs/' + id, { price: job.price })
    // await api.put('jobs/' + id, job)


    // step 4: trigger the proxystate that a change was made
    ProxyState.jobs = ProxyState.jobs

    // this can be replaced with a sweetAlert
    // window.alert("Great! You've applied")

    // @ts-ignore
    Swal.fire({
      title: "Great! You're Bout To Get This Money!",
      width: 600,
      padding: '3em',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    })
  }
}

export const jobsService = new JobsService();