```mermaid
flowchart TD
    APP[APP] --> CreateTrip[Create New Trip]
    CreateTrip --> IsLogin{Is Login?}
    
    IsLogin -- No --> LoginSignup[Login/Signup]
    LoginSignup --> SaveUser[Save New User]
    SaveUser --> Convex[Convex]

    IsLogin -- Yes --> FreeOrPaid{Free User / Paid User?}
    FreeOrPaid -- Free --> CheckLimit[Check Daily Usage Limit]
    CheckLimit --> ArcJet[ArcJet: Check Daily Usage Limit Count]
    ArcJet --> NavigatePlanner[Navigate to Trip Planner Screen]
    FreeOrPaid -- Paid --> NavigatePlanner

    NavigatePlanner --> ChatBox[ChatBox]
    NavigatePlanner --> ItineraryMap[Show Itinerary and Map]

    ChatBox --> QnA((Question Answer Format))
    QnA --> GenUI[Generative UI to Select Options]
    GenUI --> FinalTrip[Final Trip]
    FinalTrip --> SaveDB[Save to DB]
    SaveDB --> DisplayDetails[Display Details]

    ItineraryMap --> DisplayItinerary[Display Complete Itinerary]
    ItineraryMap --> ShowPlaces[Show Places on Map]

    FreeTrial[Free Trial: 1 Trip/Day, Limited Features, Reset Daily] --> FreeOrPaid
    Paid[Paid: Unlimited Trips, All Features] --> FreeOrPaid
