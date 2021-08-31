import GeneralPhase1 from './generalChecklist-Phase1.json'
import GeneralPhase2 from './generalChecklist-Phase1.json'
import GeneralPhase3 from './generalChecklist-Phase1.json'

export default {
    "EAT": {
        "same_state": [
            {
                "phase": "PPN Phase 1",
                "task": {
                    "Note": [...GeneralPhase1["Note"]["EAT"]],
                    "Before starting your journey": [...GeneralPhase1["Before starting your journey"]],
                    "At destination": [...GeneralPhase1["At destination"]]
                }
            },
            {
                "phase": "PPN Phase 2",
                "task": {
                    "Note": [...GeneralPhase2["Note"]["EAT"]],
                    "Before starting your journey": [...GeneralPhase2["Before starting your journey"]],
                    "At destination": [...GeneralPhase3["At destination"]]
                }
            },
            {
                "phase": "PPN Phase 3",
                "task": {
                    "Note": [...GeneralPhase3["Note"]["EAT"]],
                    "Before starting your journey": [...GeneralPhase3["Before starting your journey"]],
                    "At destination": [...GeneralPhase3["At destination"]]
                }
            }
        ]
    },
    "BUY": {
        "same_state": [
            {
                "phase": "PPN Phase 1",
                "task": {
                    "Note": [...GeneralPhase1["Note"]["BUY"]],
                    "Before starting your journey": [...GeneralPhase1["Before starting your journey"]],
                    "At destination": [...GeneralPhase1["At destination"]]
                }
            },
            {
                "phase": "PPN Phase 2",
                "task": {
                    "Note": [...GeneralPhase2["Note"]["BUY"]],
                    "Before starting your journey": [...GeneralPhase2["Before starting your journey"]],
                    "At destination": [...GeneralPhase3["At destination"]]
                }
            },
            {
                "phase": "PPN Phase 3",
                "task": {
                    "Note": [...GeneralPhase3["Note"]["BUY"]],
                    "Before starting your journey": [...GeneralPhase3["Before starting your journey"]],
                    "At destination": [...GeneralPhase3["At destination"]]
                }
            }
        ]
    },
    "WORK": {
        "same_state": [
            {
                "phase": "PPN Phase 1",
                "task": {
                    "Note": [...GeneralPhase1["Note"]["WORK"]],
                    "Before starting your journey": [...GeneralPhase1["Before starting your journey"]],
                    "At destination": [...GeneralPhase1["At destination"]]
                }
            },
            {
                "phase": "PPN Phase 2",
                "task": {
                    "Note": [...GeneralPhase2["Note"]["WORK"]],
                    "Before starting your journey": [...GeneralPhase2["Before starting your journey"]],
                    "At destination": [...GeneralPhase3["At destination"]]
                }
            },
            {
                "phase": "PPN Phase 3",
                "task": {
                    "Note": [...GeneralPhase3["Note"]["WORK"]],
                    "Before starting your journey": [...GeneralPhase3["Before starting your journey"]],
                    "At destination": [...GeneralPhase3["At destination"]]
                }
            }
        ]
    },
    "SOMEWHERE": {
        "cross_state": [
            {
                "location_phase": "PPN Phase 1",
                "destination_phase": "PPN Phase 1",
                "task": {
                    "Cross state requirement": [],
                    "Before": [],
                    "At destination": []
                }
            }
        ],
        "same_state": [
            {
                "phase": "PPN Phase 1",
                "task": {
                    "Note": [...GeneralPhase1["Note"]["SOMEWHERE"]],
                    "Before starting your journey": [...GeneralPhase1["Before starting your journey"]],
                    "At destination": [...GeneralPhase1["At destination"]]
                }
            },
            {
                "phase": "PPN Phase 2",
                "task": {
                    "Note": [...GeneralPhase2["Note"]["SOMEWHERE"]],
                    "Before starting your journey": [...GeneralPhase2["Before starting your journey"]],
                    "At destination": [...GeneralPhase3["At destination"]]
                }
            },
            {
                "phase": "PPN Phase 3",
                "task": {
                    "Note": [...GeneralPhase3["Note"]["SOMEWHERE"]],
                    "Before starting your journey": [...GeneralPhase3["Before starting your journey"]],
                    "At destination": [...GeneralPhase3["At destination"]]
                }
            }
        ]
    }
}