from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from typing import Any, Text, Dict, List
import requests

# dispatcher – the dispatcher which is used to send messages back to the user
# use dispatcher.utter_message() or any other rasa_sdk.executor.CollectingDispatcher method

# tracker – the state tracker for the current user
# You can access slot values using tracker.get_slot(slot_name)

base_url = "http://api.weatherapi.com/v1"
api_key = "229b91fb61cd4e329a572217242905"


class ActionGetWeatherTime(Action):

    def name(self) -> Text:

        return "action_get_weather_time"

    async def run(
        self,
        dispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        city = tracker.get_slot("city")

        if not city:
            dispatcher.utter_message(
                text="I didn't get the city. Could you please provide the city name?"
            )
            return []

        try:

            payload = {"key": api_key, "q": city}
            response = requests.get(base_url + "/current.json", params=payload).json()

            raw_time = response["location"]["localtime"][11::]

            if raw_time[1] == ":":
                hh = int(raw_time[:1:])
                mm = raw_time[2::]
            else:
                hh = int(raw_time[:2:])
                mm = raw_time[3::]

            if hh > 12:
                am_pm_time = str(hh - 12) + ":" + mm + "pm"
            elif hh == 12:
                am_pm_time = str(hh) + ":" + mm + "pm"
            else:
                am_pm_time = str(hh) + ":" + mm + "am"

            conditions = response["current"]["condition"]["text"]
            temp = str(response["current"]["temp_c"])

            output = (
                "It is "
                + am_pm_time
                + " in "
                + city
                + " with a temperature of "
                + temp
                + " °C and "
                + conditions
            )

            dispatcher.utter_message(text=output)

        except Exception as err:
            dispatcher.utter_message(text=f"An unexpected error occurred: {err}")

        return []
