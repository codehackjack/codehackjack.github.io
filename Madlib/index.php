<!DOCTYPE html>

<link rel="stylesheet" href="style.css">

<html>
    
<head>
    <title>Wacky Jack's Mad lib</title>  
</head>

<div1>
    <strong> "Mad lib" <br></strong>
</div1>
    
<div2 style="width:304px;height:228px;">
 
</div2>    

<div>
     <button id="button1" name="button" onClick='location.href="?button1=1"'>Scramble the Mad Lib</button>
   
 
</div>     
<body>
   
    
    <?php
        
        if($_GET['button1']){fun1();}
    
        function fun1()
        {
           
             //PhotoArray
            $PhotoArr = array('image.jpg','image1.jpg','image2.jpg','image3.jpg','image4.jpg','image5.jpg','image6.jpg','image7.jpg','image8.jpg');
            //verbArray
            $AdjArr = array('beautiful','charming','dirty','rotten','brand new','elegant','haunted');
            //Proper noun 
            $PNounArr[0] = "Peter";
            $PNounArr[1] = "Parker";
            $PNounArr[2] = "Kevin";
            $PNounArr[3] = "Hubert";
            $PNounArr[4] = "Rob";
            $PNounArr[5] = "Harold";
            $PNounArr[6] = "Fred";
            $PNounArr[7] = "Ryan";
            $PNounArr[8] = "Frank";
            $PNounArr[9] = "Marquis";
            $PNounArr[10] = "Dan";
            $PNounArr[11] = "Randy";
            $PNounArr[12] = "Darryl";
            $PNounArr[13] = "Joey Johnson";
            $PNounArr[14] = "Randy Roberts";
            shuffle($PNounArr);
            //in order to generate possible accurate title
            //noun array
            $NounArr[0] = "bat";
            $NounArr[1] = "smart phone";
            $NounArr[2] = "lipstick";
            $NounArr[3] = "noodle bowl";
            $NounArr[4] = "bottle of rhum";
            $NounArr[5] = "ipod touch";
            $NounArr[6] = "odd sock collection";
            $NounArr[7] = "laptop";
            $NounArr[8] = "latex Glove";
            $NounArr[9] = "pickle";
            $NounArr[10] = "offensive sticker";
            $NounArr[11] = "pair of ".$PNounArr[9]."'s earings";
            $NounArr[12] = "piece of paper regarding ".$PNounArr[7]."'s family inheritance";
            $NounArr[13] = "selfie stick";
            
            //verb array
            $VerbArr[0] = "run";
            $VerbArr[1] = "sprint";
            $VerbArr[2] = "bus";
            $VerbArr[3] = "train";
            $VerbArr[4] = "jump";
            $VerbArr[5] = "drive";
            $VerbArr[6] = "spit";
            $VerbArr[7] = "sing";
            $VerbArr[8] = "choke";
            $VerbArr[9] = "sell ".$PNounArr[0]."'s brand new car";
            $VerbArr[10] = "Catch a flight";

            //Location Array
            $LocationArr[0] = "Toronto";
            $LocationArr[1] = "Paris";
            $LocationArr[2] = "Georgetown";
            $LocationArr[3] = "Hamilton";
            $LocationArr[4] = "Peterborough";
            $LocationArr[5] = "Brampton";
            $LocationArr[6] = $PNounArr[0]."'s house";
            $LocationArr[7] = $PNounArr[0]."'s home town";
            
           
            //the Title array
            $TitleArr[0] = ('The Pied Piper');
            $TitleArr[1] = ($PNounArr[0]."'s Loose Maneuver");
            $TitleArr[2] = ($PNounArr[0]."'s Sticky Situation");
            $TitleArr[3] = ($PNounArr[0]."'s Trouble in Paradise");    
            $TitleArr[4] = ($PNounArr[0]."'s Peril");
            $TitleArr[5] = ("Reader's Digest Tale of the Week");
            $TitleArr[6] = ("Nightmare on ".$PNounArr[0]."'s Street" );            

            
            shuffle($TitleArr);
            shuffle($AdjArr);
            shuffle($LocationArr);
            shuffle($VerbArr);
            shuffle($NounArr);
            shuffle($PhotoArr);
            
            //use shuffle button to change the order of the array elements within the story


            $str1 = " One day, ".$AdjArr[0]." ".$PNounArr[0]." was heading to ".$LocationArr[0]." and saw a ".$AdjArr[1]." ".$NounArr[0].".<br>";

            $str2 = "Spooked, ".$PNounArr[0]." Opened a ".$NounArr[1]." and called a friend, ".$PNounArr[1]."<br>";

            $str3 = "Once ".$PNounArr[1]." picked up the call, he soon began to sense something was terribly wrong. "."<br>"." He then decided it might be a good idea to ".$VerbArr[0]." to ".$LocationArr[1]." in order to calm down"."<br>";

            $str4 = "As they approached ".$LocationArr[1].", ".$PNounArr[1]." began to worry about seeing ".$AdjArr[3]." ".$PNounArr[2]." as he was threatened by ".$PNounArr[2]. " about never returning the ".$AdjArr[2]." ".$NounArr[3].".";

            //echo ("Shuffle Complete");
            echo "<br>".$TitleArr[0]."<br><br>";
            echo '<img src="'.$PhotoArr[0].'"><br>';
            echo $str1;
            echo $str2;
            echo $str3;
            echo $str4;
            
            
        }   


    ?>
    
</body>  
</html>

