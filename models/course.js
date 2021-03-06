const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, image){
        this.title = title;
        this.price = price;
        this.image = image;
        this.id = uuidv4();
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            image: this.image
        }
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON());

        return new Promise((resolve, reject) => {

            fs.writeFile(
                path.join(__dirname, '..', 'data', 'couses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'couses.json'),
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id) {
        const courses = await Course.getAll();
        return courses.find(item => item.id === id);
    }

    static async update(course) {
        const courses = await Course.getAll();

        const ind = courses.findIndex(c => c.id === course.id);
        courses[ind] = course;

        return new Promise((resolve, reject) => {

            fs.writeFile(
                path.join(__dirname, '..', 'data', 'couses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
}

module.exports = Course;