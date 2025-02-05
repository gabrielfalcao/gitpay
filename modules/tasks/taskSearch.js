const Promise = require('bluebird')
const models = require('../../models')
const { Op, Sequelize } = require('sequelize')
const programminglanguage = require('../../models/programminglanguage')

module.exports = Promise.method(function taskSearch(searchParams) {
  let query = {
    [Op.or]: [
      { private: null },
      { private: false },
    ]
  }

  if (searchParams.projectId) query.ProjectId = { [Op.eq]: parseInt(searchParams.projectId) }
  if (searchParams.userId) query.userId = searchParams.userId
  if (searchParams.status) query.status = searchParams.status
  if (searchParams.url) query.url = searchParams.url

  const labelWhere = searchParams.labelIds ? {
    model: models.Label,
    where: { id: { [Op.in]: searchParams.labelIds } },
    attributes: ['name'],
    through: {
      attributes: []
    },
    group: ['tasks.id'], // Adjust according to your SQL dialect, e.g., "tasks.id" for Postgres
    having: Sequelize.literal(`COUNT(DISTINCT "Label"."id") = ${searchParams.labelIds.length}`)
  } : models.Label

  if (searchParams.organizationId && !searchParams.projectId) {
    let tasks = []
    return models.Project
      .findAll(
        {
          where: {
            OrganizationId: parseInt(searchParams.organizationId)
          },
          include: [{
            model: models.Task,
            include: [models.User, models.Order, models.Assign, models.Project, labelWhere]
          }],
          order: [
            ['id', 'DESC']
          ]
        }
      )
      .then(projects => {
        projects.map(p => {
          p.Tasks.map(t => tasks.push(t))
        })
        return tasks
      })
  }
  else {
    return models.Task
      .findAll(
        {
          where: query,
          include: [
            { model: models.User },
            { model: models.Order },
            { 
              model: models.Project,
              include: [{ model: models.ProgrammingLanguage, as: 'ProgrammingLanguages' }]
            },
            { 
              model: models.Assign, 
              include: [{ model: models.User }] 
            },
            { model: labelWhere }
          ],
          order: [
            ['status', 'DESC'],
            ['id', 'DESC']
          ]
        }
      )
      .then(data => {
        return data.filter(task => {
          const project = task.Project
          if (searchParams.languageIds && searchParams.languageIds.length > 0) {
            return project?.ProgrammingLanguages.some(pl => searchParams.languageIds.includes(`${pl.id}`))
          }
          return true
        })
      })
  }
})
