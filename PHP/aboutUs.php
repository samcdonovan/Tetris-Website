<?php
include_once ("globalFunctions.php");

general_header("About Us");
navigationBar("About Us");
?>

<main>
    <!-- info about this project and my aims -->
    <div class="projectAims">
        <h1>This Project And My Aims</h1>
        <p>With this project, my goal is to create a fairly comprehensive version
            of Tetris, having most of the features that a normal game of Tetris would have.
            As a university project, this is a daunting task to undertake, but I am confident
            in my abilities and I am looking forward to the challenge it presents. I decided 
            to make Tetris for this project because it is a well known, easy-to-grasp game, 
            but I also wanted a game that would challenge me as a computer scientist. Tetris 
            seemed like the perfect fit for me!
        </p>
    </div>


    <!-- slideshow showing tetris pictures -->
    <div class="slideshow">
        <div class="slides">
            <div class="slide" id="slide1">
                <img src="../images/slide1.png" alt="slide 1">
            </div>
            <div class="slide" id="slide2">
                <img src="../images/slide2.png" alt="slide 2">
            </div>
            <div class="slide" id="slide3">
                <img src="../images/slide3.png" alt="slide 3">
            </div>
            <div class="slide" id="slide4">
                <img src="../images/slide4.png" alt="slide 4">
            </div>
        </div>

        <!-- navigate the slideshow using links to the other pictures -->
        <div class="slideLinks">
            <a href="#slide1">1</a>
            <a href="#slide2">2</a>
            <a href="#slide3">3</a>
            <a href="#slide4">4</a> 
        </div>
    </div>

    <!-- contact information with phone and email icons -->
    <div class="contact">
        <h1>Contact Details</h1>
        <div class="phone">
            <img src="../images/phone.png" alt="PHONE ICON">
            <p> 009999999</p>
        </div>
        <div class="email">
            <img src="../images/email.png" alt="EMAIL ICON">
            <p>9999@mdx.ac.uk</p>
        </div>
        <div class="address">
            <p>Address:<br>
                Middlesex University, The Burroughs<br>
                Hendon<br>
                London, NW4 4BT<br></p>
        </div>

        <!-- placeholder for a map -->
        <div class="mapPlaceholder">
            <img src="../images/map.png" alt="MAP">
        </div> 
    </div>

</main>

<?php
general_footer();
?>
