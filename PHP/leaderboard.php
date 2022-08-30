<?php

include_once ("globalFunctions.php");

general_header("Leaderboard");
navigationBar("Leaderboard");
?>

<script src = "../JS/leaderboard.js"></script>
<main>
    <!--  a table that will show the users with the highest score, in order (highest first); -->
    <table>

        <caption>Leaderboard</caption>
        <thead>
        <th>Rank</th><th id="user">User</th><th>Score</th>
        </thead>
        <tbody id="leaderboard"></tbody>

        <!-- leaderboard data is entered dynamically, after the page is loaded -->
        <script> leaderboard()</script>

    </table>
</main>
<?php

general_footer();
?>