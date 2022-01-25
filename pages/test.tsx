import { Box } from "@mui/material";
import { NextPage } from "next";
import MatchSummary from "../components/MatchSummary";
import TeamSummary from "../components/TeamSummary";
import TournamentSummary from "../components/TournamentSummary";
import UserSummary from "../components/UserSummary";

const Test: NextPage = () => {
    return (
        <Box sx={{ maxWidth: "50rem", padding: "1em" }}>
            <Box sx={{ display: "flex" }}>
                <TeamSummary
                    team={{
                        id: 0,
                        name: "The super team",
                        description: "very very long long long test desc",
                        match_count: 0,
                        win_count: 0,
                    }}
                />
                <TeamSummary
                    team={{
                        id: 0,
                        name: "The super team",
                        description: "very very long long long test desc",
                        match_count: 0,
                        win_count: 0,
                    }}
                />
                <TeamSummary
                    team={{
                        id: 0,
                        name: "The super team",
                        description: "very very long long long test desc",
                        match_count: 0,
                        win_count: 0,
                    }}
                />
                <TeamSummary
                    team={{
                        id: 0,
                        name: "The super team",
                        description: "very very long long long test desc",
                        match_count: 0,
                        win_count: 0,
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", marginTop: "1em" }}>
                <UserSummary
                    user={{ id: 1, username: "sautax", admin: true }}
                />

                <UserSummary user={{ id: 2, username: "toto", admin: false }} />
            </Box>
            <Box sx={{ display: "flex", marginTop: "1em" }}>
                <TournamentSummary
                    tournament={{
                        id: 1,
                        type: 1,
                        name: "Tournois DO",
                        description: "test description",
                        start_date: new Date(),
                        end_date: new Date(),
                        max_teams: 10,
                        game_name: "Super Smash Bros Ultimate",
                        status: 0,
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", marginTop: "1em" }}>
                <MatchSummary
                    match={{
                        id: 1,
                        team1_id: 1,
                        team2_id: 2,
                        row: 1,
                        column: 1,
                        tournament_id: 1,
                        status: 1,
                        date: new Date(),
                    }}
                    teams={[
                        {
                            id: 1,
                            name: "Team 1",
                            description: "very very long long long test desc",
                            match_count: 0,
                            win_count: 0,
                        },
                        {
                            id: 2,
                            name: "The super team",
                            description: "very very long long long test desc",
                            match_count: 0,
                            win_count: 0,
                        },
                    ]}
                />
            </Box>
        </Box>
    );
};

export default Test;
