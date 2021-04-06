export default class House {
  constructor({price, bedrooms, bathrooms, levels, year, description, imgUrl, id}) {
    // NOTE it is no longer our job to generate Id's
    this.price = price
    this.bedrooms = bedrooms
    this.bathrooms = bathrooms
    this.levels = levels
    this.year =year
    this.description = description
    this.imgUrl = imgUrl || "placehold.it/200X200"
    this.id = id
  }
  get Template() {
    return `
    <div class="col-md-4 mb-3">
      <div class="card shadow">
          <img class="card-img-top" src="${this.imgUrl}" alt="">
          <div class="card-body">
              <h4 class="card-title">${this.bedrooms} | ${this.bathrooms} | ${this.levels} | ${this.year}</h4>
              <p class="card-text">${this.description} - $${this.price.toFixed(2)}</p>
          </div>
          <div class="px-3 pb-3 d-flex justify-content-between">
              <button type="button" class="btn btn-danger" onclick="app.housesController.deleteHouse('${this.id}')">Delete</button>
              <button type="button" class="btn btn-info" onclick="app.housesController.bid('${this.id}')">Bid</button>
          </div>
      </div>
    </div>
    `
  }
}