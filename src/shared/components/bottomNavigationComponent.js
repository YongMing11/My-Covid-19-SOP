import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HelpdeskPage from "../../modules/Helpdesk/HelpdeskPage";
import HomePage from "../../modules/Home/HomePage";
import HospitalPage from "../../modules/Hospital/HospitalPage";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const BottomNavigationComponent = () => {
    const [index, setIndex] = React.useState(2);
    const [routes] = React.useState([
        { key: "music", title: "SOP Info", icon: "information-outline" },
        { key: "albums", title: "Helpdesk", icon: "comment-question-outline" },
        { key: "assistance", title: "Assistance", icon: "lifebuoy" },
        { key: "hospital", title: "Hospital", icon: "hospital-box-outline" },
        { key: "profile", title: "Profile", icon: "account-cog-outline" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        music: HomePage,
        albums: HelpdeskPage,
        assistance: HomePage,
        hospital: HospitalPage,
        profile: HomePage,
    });

    return <BottomNavigation shifting={false} activeColor="#0E4DA4" inactiveColor="#979797" barStyle={{ backgroundColor: "#F4F4F4", height: 60 }} navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
};

export default BottomNavigationComponent;
