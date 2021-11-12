const factories = [
  { name: 'BR1', employees: ['John', 'Alice', 'Bob', 'Jessie', 'Karen'] },
  { name: 'BR2', employees: ['Jessie', 'Karen', 'John'] },
  { name: 'BR3', employees: ['Miles', 'Eric', 'Henry', 'Bob'] },
  { name: 'BR4', employees: [] },
]

// 1. Count Employees Number by Factory => [ {name: 'BR1', count: 4}, ... ]

const countByFactory = (factories) => {
  const answer = factories.map((factory) => ({
    name: factory.name,
    count: factory.employees.length,
  }))
  return answer
}

//2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]

const countByEmployee = (factories) => {
  const answer = []
  factories.forEach((factory) => {
    factory.employees.forEach((employee) => {
      let duplicateIndex = answer.findIndex((e) => e.employee === employee)
      if (duplicateIndex >= 0) {
        answer[duplicateIndex].count += 1
      } else {
        answer.push({ employee, count: 1 })
      }
    })
  })
  return answer
}

//3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }

const orderByAlpha = (factories) => {
  const answer = factories.map((factory) => ({
    name: factory.name,
    employees: factory.employees.sort(),
  }))
  return answer
}

const employeeType = [
  { id: 1, name: 'FullTime', work_begin: '09:00:00', work_end: '17:00:00' },
  { id: 2, name: 'MidTime', work_begin: '12:00:00', work_end: '21:00:00' },
  { id: 3, name: 'HalfTime', work_begin: '20:00:00', work_end: '00:00:00' },
]

const employees = [
  { id: 1, name: 'Alice', type: 2 },
  { id: 2, name: 'Bob', type: 3 },
  { id: 3, name: 'John', type: 2 },
  { id: 4, name: 'Karen', type: 1 },
  { id: 5, name: 'Miles', type: 3 },
  { id: 6, name: 'Henry', type: 1 },
]

const tasks = [
  { id: 1, title: 'task01', duration: 60 }, //min},
  { id: 2, title: 'task02', duration: 120 },
  { id: 3, title: 'task03', duration: 180 },
  { id: 4, title: 'task04', duration: 360 },
  { id: 5, title: 'task05', duration: 30 },
  { id: 6, title: 'task06', duration: 220 },
  { id: 7, title: 'task07', duration: 640 },
  { id: 8, title: 'task08', duration: 250 },
  { id: 9, title: 'task09', duration: 119 },
  { id: 10, title: 'task10', duration: 560 },
  { id: 11, title: 'task11', duration: 340 },
  { id: 12, title: 'task12', duration: 45 },
  { id: 13, title: 'task13', duration: 86 },
  { id: 14, title: 'task14', duration: 480 },
  { id: 15, title: 'task15', duration: 900 },
]

//4. Count total hours worked in 1 day ?
const countTotalHours = () => {
  const typeDurations = employeeType.map((type) => {
    const beginTime = type.work_begin.split(':')[0]
    const endTime = type.work_end.split(':')[0] === '00' ? '24' : type.work_end.split(':')[0]
    return { type: type.id, duration: Number(endTime) - Number(beginTime) }
  })
  let totalHours = 0
  employees.forEach((employee) => {
    totalHours += typeDurations.find((duration) => duration.type === employee.type).duration
  })
  return totalHours
}

//5. Make a function that take as parameters dayTime and return number of employee working
const howManyEmployeeByTime = (time) => {
  let currentHour = time.getHours()
  let totalEmployees = 0
  employeeType.forEach((type) => {
    const beginTime = Number(type.work_begin.split(':')[0])
    const endTime = Number(type.work_end.split(':')[0] === '00' ? '24' : type.work_end.split(':')[0])
    const isBetween = currentHour <= endTime && currentHour >= beginTime ? true : false
    if (isBetween) {
      const workingEmployee = employees.filter((employee) => employee.type === type.id)
      totalEmployees += workingEmployee.length
    }
  })
  return totalEmployees
}

//6. How many days of work needed to done all tasks ?
const daysForAllTasks = () => {
  const totalMinutes = countTotalHours() * 60
  let totalDuration = tasks.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.duration
  }, 0)
  const totalDays = Math.ceil(totalDuration / totalMinutes)
  return totalDays
}

console.log(countByFactory(factories))
console.log(countByEmployee(factories))
console.log(orderByAlpha(factories))
console.log(countTotalHours())

const today = new Date()
console.log(howManyEmployeeByTime(today))
console.log(daysForAllTasks())
