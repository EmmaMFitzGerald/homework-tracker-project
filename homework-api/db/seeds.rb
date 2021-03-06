# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Homework.destroy_all
Subject.destroy_all

geography = Subject.create(name: "Geography")

geography.homeworks.create(content: "Prepare essay on Mt. Etna", date: "2019/10/12", completion: false)

history = Subject.create(name: "History")

history.homeworks.create(content: "Prepare essay on Roman Empire", date: "2019/10/13", completion: true)