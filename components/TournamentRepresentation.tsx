import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useCallback } from "react";
import { Match, MatchStatus } from "../utils/matches";
import { Team } from "../utils/teams";
import { Tournament, TournamentType } from "../utils/tournaments";

const boxSx = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
};

export function DefaultTournament(props: {
    tournament: Tournament;
    matches: Match[];
    teams: Team[];
}) {
    const getTeamWins = useCallback(
        (team: Team) => {
            return props.matches.filter(
                (match) =>
                    (match.team1_id === team.id &&
                        match.status === MatchStatus.Team1Won) ||
                    (match.team2_id === team.id &&
                        match.status === MatchStatus.Team2Won)
            ).length;
        },
        [props.matches]
    );

    const teamsWithWins = props.teams.map((team) => {
        return {
            ...team,
            wins: getTeamWins(team),
        };
    });

    return (
        <>
            <Typography variant="h5">Leaderboard</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "20rem" }}>
                    <TableHead>
                        <TableCell>Position</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Wins</TableCell>
                    </TableHead>
                    {teamsWithWins
                        .sort((a, b) => {
                            return b.wins - a.wins;
                        })
                        .map((team, index) => (
                            <Link
                                key={team.id}
                                href={`/teams/${team.id}`}
                                passHref
                            >
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{team.name}</TableCell>
                                    <TableCell>{team.wins}</TableCell>
                                </TableRow>
                            </Link>
                        ))}
                </Table>
            </TableContainer>
        </>
    );
}
export function SimpleElimination(props: {
    tournament: Tournament;
    matches: Match[];
    teams: Team[];
}) {
    return <></>;
}

export default function TournamentRepresentation(props: {
    tournament: Tournament;
    matches: Match[];
    teams: Team[];
}) {
    switch (props.tournament.type) {
        case TournamentType.SimpleElimination:
            return (
                <SimpleElimination
                    tournament={props.tournament}
                    teams={props.teams}
                    matches={props.matches}
                />
            );
        default:
            return (
                <DefaultTournament
                    tournament={props.tournament}
                    teams={props.teams}
                    matches={props.matches}
                />
            );
    }
}
