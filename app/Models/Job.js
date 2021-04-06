export default class Job{
  constructor({company, description, jobTitle, hours, rate, id}){
    this.company = company
    this.description = description
    this.jobTitle = jobTitle
    this.hours = hours
    this.rate = rate
    this.id = id
  }
  get Template() {
    return `
    <div class="col-md-4 mb-3">
      <div class="card shadow">
          <div class="card-body">
              <h4 class="card-title">${this.jobTitle}</h4>
              <p class="card-text">${this.company} </p>
              <p class="card-text">${this.description}  | ${this.rate} | ${this.hours} </p>
          </div>
          <div class="px-3 pb-3 d-flex justify-content-between">
              <button type="button" class="btn btn-danger" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
              <button type="button" class="btn btn-info" onclick="app.jobsController.apply('${this.id}')">Apply</button>
          </div>
      </div>
    </div>
    `
  }

}












// "_id": "604a18fffc7f3c0015adaa02",
// "company": "COdeworks",
// "description": "Code Monkey",
// "jobTitle": "Driver",
// "hours": 21,
// "rate": 21,
// "__v": 0,
// "id": "604a18fffc7f3c0015adaa02"