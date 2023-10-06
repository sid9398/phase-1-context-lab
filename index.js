function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour] = array
    const employeeRecord = {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    }
    return employeeRecord;
  }

  // createEmployeeRecords

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }

function createTimeInEvent(dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
  
    const newEvent = {
      type: 'TimeIn',
      date: date,
      hour: parseInt(time)
    };
  
    this.timeInEvents.push(newEvent);
  
    return this;
  }
  
  function createTimeOutEvent(dateTimeString) {
    const [date, time] = dateTimeString.split(" ");
    const [year, month, day] = date.split("-");
    const hour = parseInt(time.slice(0, 2) + time.slice(2));
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: hour,
    };
  
    this.timeOutEvents.push(timeOutEvent);
  
    return this;
  }

  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }

  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const rate = this.payPerHour;
    const earnings = hoursWorked * rate;
    return earnings;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(function (employee) {
      return employee.firstName === firstNameString;
    });
  }

  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
    for (let i = 0; i < employeeRecords.length; i++) {
      const employee = employeeRecords[i];
      const datesWorked = employee.timeInEvents.map(event => event.date);
      const wages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate.call(employee, date), 0);
      totalPayroll += wages;
    }
    return totalPayroll;
  }