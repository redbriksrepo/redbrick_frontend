export interface ProposalData {

  salesTeam: String,
  salesHead: String,
  location: String,
  center: String,
  broker: {
    brokerType: String,
    brokerCategory: String,
    brokerCategoryOther: String
  },
  spocName: String,
  clientName: String,
  workStation: {
    workStationCategory: String,
    workStationNumber: Number,
    collabArea: String,
    dryPantry: String,
    storageRoom: String,
    storageRoomNumber: Number,
    cafeteria: String,
    cafeteriaNumber: Number
  },
  cabin: {
    cabinCategory: String,
    cabinNumber: Number,
    reception: String,
    visitorMeetingRoom: {
      visitorMeetingRoomToggle: String,
      visitorMeetingRoomCategory: String,
      visitorMeetingRoomNumber: Number
    }
  },
  meetingRooms: {
    meetingRoomsCategory: String,
    meetingRoomNumber: Number,
    mailRoom: String,
    bmsRoom: String,
    compactor: String
  },
  Status: String

}