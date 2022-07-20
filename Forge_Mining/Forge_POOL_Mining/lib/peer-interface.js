
const fetch = require("node-fetch");

var web3Utils = require('web3-utils')

var cluster = require('cluster')
 //var redis = require("redis");
   var jayson = require('jayson');

   var web3utils =  require('web3-utils');

   var peerUtils = require('./peer-utils')

  // var redisClient;

  const UPDATE_HASHRATE_PERIOD = 30 * 1000; //30 seconds



  const SOLUTION_FINDING_BONUS = 10.0;
  var varDiffPeriodCount = 0;
  var PROCESS_DIFFICULTY = false; // false means vardiff

module.exports =  {


  async init( web3, accountConfig, poolConfig , redisInterface, tokenInterface ,pool_env)
  {
    this.pool_env = pool_env;
    this.web3=web3;
    this.accountConfig =accountConfig;
    this.poolConfig=poolConfig;

    this.redisInterface=redisInterface;
    this.tokenInterface=tokenInterface;


    if(this.poolConfig.poolTokenFee == null)
    {
      console.log('Please set a poolTokenFee (% of tokens as a pool fee)')
      exit()
      return;
      }



  },

  async listenForJSONRPC(port)
  {

        this.initJSONRPCServer(port);
  },

  async update()
  {


    var self = this;

    setTimeout(function(){self.processQueuedShares()},40)



      if (cluster.isMaster) {
        console.log("CLUSTER IS MASETER");
        setTimeout(function(){self.monitorMinedSolutions()},20*1000)
      }




    //Error
    //setTimeout(function(){self.monitorMinedPayments()},5000)

     setTimeout(function(){self.updateHashrate()},30*1000)

     //setTimeout(function(){self.cleanRedisData()},0)
  },



   getPoolMinimumShareDifficulty()
   {
     return this.poolConfig.minimumShareDifficulty;
   },

   async getMinerVarDiff(minerEthAddress)
   {
	
    if(minerEthAddress == "0x26a6d3e1c41AB1244eb64C85578b4F5B9829C6bA"){
	return 206005;
}
     if( minerEthAddress == null ||  typeof minerEthAddress == 'undefined' )
     {
	//console.log("YUP THIS");
       var poolMinDiff = this.getPoolMinimumShareDifficulty();
       return  poolMinDiff;
     }

     var minerData = await this.loadMinerDataFromRedis(minerEthAddress)

     var varDiff = minerData.varDiff;

     if(varDiff < this.getPoolMinimumShareDifficulty())
     {
       varDiff = this.getPoolMinimumShareDifficulty();
     }
	var estim = 0;
	var teezzz = await this.redisInterface.getRecentElementsOfListInRedis(('miner_submitted_share:'+minerEthAddress.toString()), 50)
	if(teezzz.length > 2){	
	for(var x=0; x<teezzz.length; x++){
	estim +=  teezzz[x].hashRateEstimate;
	if(x==10){break;}
}

	var teez = parseInt(estim / teezzz.length); 
	//console.log("estim", estim, " minerEthAddress : ",minerEthAddress);
	//console.log("estimate avg", teez);
}
		 //  console.log("TURN ON EASY FOR ",minerEthAddress, " estim", estim);
	if(teez <= 4515921123){
		//   console.log("TURN ON EASY FOR ",minerEthAddress);
		//console.log("Judge1: ", teez);
		//console.log("Judge2: ", 1215921123);
		return 7601;
}else if (estim == 0){
	return 7601;
}else{
	return 206005;
}	
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849,test"){ return 2000;}
	if(minerEthAddress == "0x053f362a312f09249c966ce4121f6d896c271f43,BLACK10"){ return 1000;}
	if(minerEthAddress == "0x053f362a312f09249c966ce4121f6d896c271f43,BLACK10"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(minerEthAddress == "0xff1B0cD38F7F6811028B5CACA3B332fC8183E849"){ return 1000;}
	if(varDiff == 905){ return 56005; }
        return varDiff;
   },

   getPoolMinimumShareTarget(diff) //compute me
   {
     if(diff == null)
     {
       diff =   this.getPoolMinimumShareDifficulty()
     }
     return this.getTargetFromDifficulty(diff);
   },


   getTargetFromDifficulty(difficulty)
   {
     if(this.pool_env == "test")
     {
       var max_target = web3utils.toBN( 2 ).pow( web3utils.toBN( 234 ) ) ;
     }else{
       var max_target = web3utils.toBN( 2 ).pow( web3utils.toBN( 234 ) ) ;
     }
     var current_target = max_target.div( web3utils.toBN( difficulty) );
     return current_target ;
   },


   /*
    This is the gatekeeper for solution submits
   */
   async handlePeerShareSubmit(nonce,minerEthAddress,challengeNumber,digest,difficulty)
   {


/*
     console.log('\n')
     console.log('---- received peer share submit -----')
     console.log('nonce',nonce)
     console.log('challengeNumber',challengeNumber)
     console.log('minerEthAddress',minerEthAddress)
     console.log('digest',+ )

     console.log('difficulty',difficulty)
	console.log('\n')
*/
     if( difficulty == null  ) return ;
     if( nonce == null  ) return ;
     if( minerEthAddress == null  ) return ;
     if( challengeNumber == null  ) return ;
     if( digest == null  ) return ;

    if(minerEthAddress == "0x26a6d3e1c41AB1244eb64C85578b4F5B9829C6bA"){
	minerEthAddress = "0x673Ca8AC901Cae26322911e602FD9CBAd312700c"
	}
     var poolHelperEthAddress = this.getMintingAccount().helper;


     var poolChallengeNumber = await this.tokenInterface.getPoolChallengeNumber();
     var computed_digest =  web3utils.soliditySha3( poolChallengeNumber , poolHelperEthAddress, nonce )

     var digestBytes32 = web3utils.hexToBytes(computed_digest)
     var digestBigNumber = web3utils.toBN(computed_digest)


     var minShareTarget = web3utils.toBN(this.getPoolMinimumShareTarget() ) ;
     var miningTarget = web3utils.toBN(await this.tokenInterface.getPoolDifficultyTarget() ) ;

     var claimedTarget = this.getTargetFromDifficulty( difficulty )



     var varDiff = await this.getMinerVarDiff(minerEthAddress);

     var usingCustomDifficulty = (difficulty != varDiff);
/*
     console.log( 'computed_digest',computed_digest )
    console.log( 'digest',digest )
     console.log( 'digestBigNumber',digestBigNumber )

      console.log( 'miningTarget',miningTarget )


       console.log( 'claimedTarget',claimedTarget )
        console.log( 'minShareTarget',minShareTarget )

*/

    var minShareDifficulty = this.getPoolMinimumShareDifficulty()  ;


    if(computed_digest === digest &&
       difficulty >= minShareDifficulty &&
       digestBigNumber.lt(claimedTarget)  ){

        var shareIsASolution = digestBigNumber.lt(miningTarget)
        return await this.handleValidShare( nonce,minerEthAddress,digest,difficulty, shareIsASolution, usingCustomDifficulty );

     }else{
       //console.log(minerEthAddress)

       var ethBlock = await this.redisInterface.getEthBlockNumber()

       var shareData =  {
         block: ethBlock,
         nonce: nonce,
         miner: minerEthAddress,
         difficulty: difficulty,
         time: peerUtils.getUnixTimeNow()
        };

       //await this.redisInterface.storeRedisHashData("invalid_share", digest , JSON.stringify(shareData))
       await this.redisInterface.pushToRedisList("miner_invalid_share:"+minerEthAddress.toString(),  JSON.stringify(shareData))



       return {success: false, message: "This share digest is invalid"};

     }

   },



   async  handleValidShare( nonce,minerEthAddress,digest,difficulty, shareIsASolution, usingCustomDifficulty )
   {
      //console.log('handle valid share ')
      var existingShare = await this.redisInterface.findHashInRedis("submitted_share", digest );

        //make sure we have never gotten this digest before (redis )
      if(existingShare == null)
      {
        //console.log('handle valid new share ')
        var ethBlock = await this.redisInterface.getEthBlockNumber()


        var minerData = await this.loadMinerShareDataFromRedis(minerEthAddress)

        if(minerData.lastSubmittedSolutionTime != null)
        {
            var timeToFindShare = (peerUtils.getUnixTimeNow() - minerData.lastSubmittedSolutionTime);
        }else{
           //make sure we check for this later
            var timeToFindShare = 0;
        }



        var shareData=  {
          block: ethBlock,
          nonce: nonce,
          miner: minerEthAddress,
          difficulty: difficulty,
          isSolution: shareIsASolution,
          hashRateEstimate: this.getEstimatedShareHashrate(difficulty,timeToFindShare),
          time: peerUtils.getUnixTimeNow(),
          timeToFind: timeToFindShare  //helps estimate hashrate- look at recent shares
        };
	//console.log(shareData);

        //make sure this is threadsafe
        await this.redisInterface.storeRedisHashData("submitted_share", digest , JSON.stringify(shareData))
        await this.redisInterface.pushToRedisList("miner_submitted_share:"+minerEthAddress.toString(),  JSON.stringify(shareData))

        //await this.redisInterface.pushToRedisList("submitted_shares_list", JSON.stringify(shareData))

        if(shareIsASolution)
        {
          await this.redisInterface.pushToRedisList("submitted_solutions_list", JSON.stringify(shareData))
        }

        //redisClient.hset("submitted_share", digest , JSON.stringify(shareData), redis.print);

        var shareCredits =  await this.getShareCreditsFromDifficulty( difficulty,shareIsASolution )

        await this.awardShareCredits( minerEthAddress, shareCredits )

        var challengeNumber = await this.tokenInterface.getPoolChallengeNumber();

        if( shareIsASolution )
        {
          this.tokenInterface.queueMiningSolution( nonce,minerEthAddress,digest,challengeNumber );
        }else{
            //console.log('share is not a solution! ')
        }

        return {success: true, message: "New share credited successfully"}

      }else{
        return {success: false, message: "This share digest was already received"}
      }

   },




   //also update hashrate
   async updateHashrate()
   {

     var self = this ;


           var minerList =  await this.getMinerShareList()


           for(i in minerList) //reward each miner
           {
             var minerAddress = minerList[i];

             var minerData = await this.getMinerShareData(minerAddress)

             try{
             minerData.hashRate = await this.estimateMinerHashrate(minerAddress )
             await this.saveMinerShareDataToRedis(minerAddress,minerData);
             }catch(e){}
            }

          varDiffPeriodCount++;

        //  setTimeout(function(){self.updateVariableDifficultyPeriod()},4000  )///perform after booting
         setTimeout(function(){self.updateHashrate()},UPDATE_HASHRATE_PERIOD  )  // 1 minute
   },

   //TimeToSolveBlock (seconds) = difficulty * 2^22 / hashrate (hashes per second)


   //hashrate = (difficulty * 2^22) / timeToSolveABlock seconds)
   getEstimatedShareHashrate(difficulty, timeToFindSeconds )
   {
     if(timeToFindSeconds!= null && timeToFindSeconds>0)
     {

        var hashrate = web3utils.toBN(difficulty).mul( web3utils.toBN(2).pow(  web3utils.toBN(22) )).div( web3utils.toBN( timeToFindSeconds ) )

        return hashrate.toNumber(); //hashes per second

      }else{
        return 0;
      }
   },

   async estimateMinerHashrate(minerAddress)
   {
      try {

        var submitted_shares =  await this.redisInterface.getParsedElementsOfListInRedis(('miner_submitted_share:'+minerAddress.toString()), 80);

        if(submitted_shares == null || submitted_shares.length < 1)
        {
          return 0;
        }

        var totalDiff = 0;
        var CUTOFF_MINUTES = 90;
        var cutoff = peerUtils.getUnixTimeNow() - (CUTOFF_MINUTES * 60);

        // the most recent share seems to be at the front of the list
        var recentShareCount = 0;
        while (recentShareCount < submitted_shares.length && submitted_shares[recentShareCount].time > cutoff) {
          if(isNaN(submitted_shares[recentShareCount].difficulty)){
            continue;
          }
	//	console.log("Total:a ", totalDiff);
          totalDiff += parseInt(submitted_shares[recentShareCount].difficulty);
          recentShareCount++;
        }

        if (isNaN(totalDiff) || recentShareCount == 0)
        {
          return 0;
        }

        var seconds = submitted_shares[0].time - submitted_shares[recentShareCount - 1].time;
        if (seconds == 0)
        {
          return 0;
        }
	//console.log("Total: ", totalDiff);
	//console.log("Total sec: ", seconds);
        var hashrate = this.getEstimatedShareHashrate( totalDiff, seconds );
        return hashrate.toString();

      } catch(err)
      {
        console.log('Error in peer-interface::estimateMinerHashrate: ',err);
        return 0;
      }
  },


  //timeToFind
  async getAverageSolutionTime(minerAddress)
  {
    var submitted_shares =  await this.redisInterface.getRecentElementsOfListInRedis(('miner_submitted_share:'+minerAddress.toString()), 3)

    var sharesCount = 0;

    if(submitted_shares == null || submitted_shares.length < 1)
    {
      return null;
    }


    var summedFindingTime  = 0;

    for (var i=0;i<submitted_shares.length;i++)
    {
      var share = submitted_shares[i];

      var findingTime = parseInt(share.timeToFind);

      if(!isNaN(findingTime) && findingTime> 0 && findingTime != null)
      {
          summedFindingTime += findingTime;
            sharesCount++;
       }
    }

    if(sharesCount <= 0)
    {
      return null;
    }


    var timeToFind = Math.floor(summedFindingTime / sharesCount);
    return timeToFind;
  },

   //we expect a solution per minute ??
   async getUpdatedVarDiffForMiner(minerData,minerAddress)
   {
      var minerVarDiff = minerData.varDiff;
      var poolMinDiff = this.getPoolMinimumShareDifficulty();
      var avgFindingTime = await this.getAverageSolutionTime(minerAddress);

      //dont modify if using custom
      if(minerData.usingCustomDifficulty)
      {
        return minerVarDiff;
      }

      minerData.avgFindingTime = avgFindingTime;

      var expectedFindingTime = 60;//seconds



      if( minerData.validSubmittedSolutionsCount > 0 && avgFindingTime!= null ){
           if( avgFindingTime < expectedFindingTime * 0.9 ){
                minerVarDiff = Math.ceil(minerVarDiff * 1.2 ); //harder
           }else if( avgFindingTime > expectedFindingTime * 1.1 ){
                minerVarDiff = Math.ceil(minerVarDiff / 1.2 ); //easier
           }
      }

//HASHRATE 202110
      if(PROCESS_DIFFICULTY){
	console.log("NOPE THIS");
        return PROCESS_DIFFICULTY;
      }


      if( minerVarDiff <  poolMinDiff ){
           minerVarDiff = poolMinDiff;
      }

      var MAX_VARDIFF = 12*1024;
      var MIN_DIFF = 1024;

      if( minerVarDiff > MAX_VARDIFF ){
           minerVarDiff = MAX_VARDIFF;
      }
      if(minerVarDiff < MIN_DIFF){
        minerVarDiff = MIN_DIFF;
      }
if(minerAddress.toString().toLowerCase() == '0xa2ed64126ddb337b41cfb988c9b0fecd0541cd39'){
	minerVarDiff = 6*1024;
}
if(minerAddress.toString() == '0xff1B0cD38F7F6811028B5CACA3B332fC8183E849'){
	minerVarDiff = 4*1024;
}


      return minerVarDiff;
   },

   async processQueuedShares()
   {
       var self = this;

     var shareDataJSON = await this.redisInterface.popFromRedisList("queued_shares_list")

     var shareData = JSON.parse(shareDataJSON)
     if(typeof shareData != 'undefined' && shareData != null)
     {
	var diffz = shareData.difficulty
       try{
		   //HASHRATE 202110
         if(diffz !=56005 && diffz != 7601){
           console.log(shareData.minerEthAddress, shareData.difficulty);

    		 var a123123 = await this.getMinerVarDiff(shareData.minerEthAddress);
		diffz = a123123
	
         }
		   //HASHRATE 202110
        // var response =  await self.handlePeerShareSubmit(shareData.nonce,shareData.minerEthAddress,shareData.challengeNumber,shareData.digest,56005);
         var response =  await self.handlePeerShareSubmit(shareData.nonce,shareData.minerEthAddress,shareData.challengeNumber,shareData.digest,parseInt(diffz));
         }catch(err)
         {
           console.log('handle share error: ',err);
         }
       }
       setTimeout(function(){self.processQueuedShares()},40)

   },

   async cleanRedisData()
   {


   },

   async monitorMinedSolutions()
   {

     var self = this ;

    try {
     //console.log('monitor mined solutions ')
     var solution_txes = await this.redisInterface.getResultsOfKeyInRedis('unconfirmed_submitted_solution_tx')

     if( solution_txes != null && solution_txes.length > 0)
     {
        var response = await this.checkMinedSolutions( solution_txes )
     }
    }catch(e)
    {
    console.log('error',e)
     }

      setTimeout(function(){self.monitorMinedSolutions()},20*1000)

   },


   // resendUnbroadcastedPayments()
   async monitorMinedPayments()
   {
     return;

     var self = this ;

    try {


      
      await this.redisInterface.storeRedisHashData('broadcasted_payment' ,balancePaymentId.toString(),JSON.stringify(broadcastedPaymentData) )
      await this.redisInterface.pushToRedisList(('broadcasted_payments'), JSON.stringify(broadcastedPaymentData)  )
      await this.redisInterface.pushToRedisList(('unconfirmed_broadcasted_payments'), JSON.stringify(broadcastedPaymentData)  )
      

         //console.log('monitor mined payments ')
         var balance_xfers = await this.redisInterface.getResultsOfKeyInRedis('balance_payment')



         if( balance_xfers != null && balance_xfers.length > 0)
         {
            await this.checkMinedPayments( balance_xfers )
         }


    }catch(e){
    console.log('error',e)
     }

      setTimeout(function(){self.monitorMinedPayments()},4000)

   },



      async requestTransactionReceipt(tx_hash)
      {
          try{
           var receipt = await this.web3.eth.getTransactionReceipt(tx_hash);
         }catch(err)
         {
           console.error("could not find receipt ", tx_hash )
         }
           return receipt;
      },

   //checks each to see if they have been mined
   async checkMinedSolutions(solution_txes)
   {
    if (!cluster.isMaster) { return; }
     for(i in solution_txes)
     {
       try{
         var tx_hash = solution_txes[i];

         var txDataJSON = await this.redisInterface.findHashInRedis('unconfirmed_submitted_solution_tx',tx_hash);
         var transactionData = JSON.parse(txDataJSON)
         console.log(transactionData);


         if( transactionData.mined == false )
         {
           var liveTransactionReceipt = await this.requestTransactionReceipt(tx_hash)

           if(liveTransactionReceipt != null )
           {
             console.log('got receipt',liveTransactionReceipt )
		var fuk = liveTransactionReceipt.logs;
		console.log("FUCK RIGT: ", fuk)
		try{
			let position = fuk[0].data;
			if(position.length < 80){	
				position = fuk[1].data;
				let position2 = fuk[1].data;
				if(position2.length < 80){
					position = fuk[2].data;
				}	
			}
			console.log("position: ", position)
			let result = position.substring(3, 66);
			console.log("LTS GO: ", result)
			var yourNumber = parseInt(result, 16);
		//var bobby = web3Utils.hexToNumber(result);
			console.log("LEGGO: ", yourNumber)
               		  transactionData.mined = true;
			transactionData.token_quantity_rewarded = yourNumber;
		}catch(e){
			console.log(e);
			transactionData.token_quantity_rewarded = 0;
		}
		console.log("transactionData.token_quantity_rewarded: ", transactionData.token_quantity_rewarded)
				 console.log("TESTSSS : ",liveTransactionReceipt.status);
				 var t = liveTransactionReceipt.status
				if (t !=true ) 
				{
                 var transaction_succeeded =  (web3utils.hexToNumber( liveTransactionReceipt.status) == 1 );
				}            
			var transaction_succeeded =  liveTransactionReceipt.status === true || (web3utils.hexToNumber( liveTransactionReceipt.status) == 1 );

                 if( transaction_succeeded )
                 {
                   transactionData.succeeded = true;
                   console.log('transaction was mined and succeeded',tx_hash)
                 }else {
                   console.log('transaction was mined and failed',tx_hash)
                 }

                 await this.redisInterface.deleteHashInRedis('unconfirmed_submitted_solution_tx',tx_hash)
                 //save as confirmed
                 await this.saveSubmittedSolutionTransactionData(tx_hash,transactionData)
           }else{
             //console.log('got null receipt',tx_hash)
           }
         }


         if(transactionData.mined == true && transactionData.succeeded == true && transactionData.rewarded == false )
         {
           console.log( 'found unrewarded successful transaction ! ' , tx_hash  )

            var success = await this.grantTokenBalanceRewardForTransaction( tx_hash,transactionData )

            transactionData.rewarded = true;
            await this.saveSubmittedSolutionTransactionData(tx_hash,transactionData)
         }
       }catch($e){
         console.log("error confirming tx", $e);
       }


     }

   },



/*
  For every balance payment, make sure there is a good transfer payment

*/

   async queueBalancePayment(paymentData)
   {
     return;
     var balancePaymentId = paymentData.balancePaymentId;

    // var existingReplacementPayment = await this.redisInterface.findHashInRedis('queued_replacement_payment',balancePaymentId)

     var currentEthBlock = await this.redisInterface.getEthBlockNumber();



     //make sure only one replacement tx is being queued
  //   if( existingReplacementPayment == null   )
  //   {
        //paymentData.last_broadcast_block = currentEthBlock;
        await this.redisInterface.storeRedisHashData('queued_balance_payment' ,balancePaymentId ,JSON.stringify(paymentData) )
        //console.log('queue balance payment');


        //create a new queued transfer
        // if(this.pool_env == "staging")
        // {
            await this.tokenInterface.queueTokenTransfer(paymentData.addressTo, paymentData.tokenAmount, paymentData.balancePaymentId)
      //   }

//}


   },




     async saveSubmittedSolutionTransactionData(tx_hash,transactionData)
     {
        await this.redisInterface.storeRedisHashData('submitted_solution_tx',tx_hash,JSON.stringify(transactionData) )
        await this.redisInterface.pushToRedisList('submitted_solutions_list',JSON.stringify(transactionData) )

     },


   async loadStoredSubmittedSolutionTransaction(tx_hash)
   {
      var txDataJSON = await this.redisInterface.findHashInRedis('submitted_solution_tx',tx_hash);
      var txData = JSON.parse(txDataJSON)
      return txData
   },


  async getFeeDynamicByGasPrice(){
    return 30/100
  },

   async grantTokenBalanceRewardForTransaction(tx_hash,transactionData)
   {
     console.log("grantTokenBalanceRewardForTransaction", transactionData)

     console.log(" transactionData.token_quantity_rewarded", transactionData.token_quantity_rewarded)

     var merge_mining_addresses = transactionData['merge_mining_addresses']
     var reward_amount = transactionData.token_quantity_rewarded;
     reward_amount = reward_amount / 10000000000;


     var fee_percent =  this.poolConfig.poolTokenFee / 100.0;  // 5
     var fee_percent = await this.getFeeDynamicByGasPrice();
     console.log("fee percent is ", fee_percent)

     if(fee_percent > 1.0)  fee_percent = 1.0
     if(fee_percent < 0) fee_percent = 0.0


     var reward_amount_for_miners = Math.floor( reward_amount - (reward_amount * fee_percent) );

     console.log("grantTokenBalanceRewardForTransaction reward_amount_for_miners", reward_amount_for_miners)

     //console.log('granting',reward_amount)


      var minerList =  await this.getMinerShareList()
      var all_miner_share_data = {};

      //build data structure
      for(i in minerList) //reward each miner
      {
        try{
          var minerAddress = minerList[i];
          var minerData = await this.getMinerShareData(minerAddress)
          all_miner_share_data[minerAddress] = minerData;
        }catch(e){ 
          console.log(e);
        }
      }
     var total_shares =  this.getTotalMinerShares(all_miner_share_data);



      //now get the balance datastructure

      var all_miner_data = {};
      //build data structure
      for(i in minerList) //reward each miner // only need to loop through miner share list
      {
        try{
          var minerAddress = minerList[i];
          var minerData = await this.getMinerData(minerAddress)
          all_miner_data[minerAddress] = minerData;
        }catch(e){ 
          console.log(e);
        }
      }
     var total_shares =  this.getTotalMinerShares(all_miner_share_data);












      for(i in minerList) //reward each miner
      {
        try{
        var minerAddress = minerList[i];

         var minerShareData = all_miner_share_data[minerAddress]
         var minerRewardData = all_miner_data[minerAddress]

         console.log('minerData',minerData)

         var miner_shares = minerShareData.shareCredits;



         var miner_percent_share = parseFloat(miner_shares) / parseFloat( total_shares );

         if( isNaN(miner_percent_share) )
         {
           miner_percent_share = 0;
         }

         console.log('miner_percent_share',miner_percent_share)  //nan

         var tokensOwed =  Math.floor( reward_amount_for_miners * miner_percent_share );  //down to 8 decimals

         console.log('tokensOwed',tokensOwed)

         var  newTokenBalance = parseInt( minerRewardData.tokenBalance );
         if( isNaN(newTokenBalance) )
         {
           newTokenBalance = 0;
         }
         newTokenBalance += tokensOwed;
         var old_balance = minerRewardData.tokenBalance;

         minerRewardData.tokenBalance = newTokenBalance;
         minerShareData.shareCredits = 0; //wipe old shares


         //do it in a sort of manual way

         var SEDO_ADDRESS = "0x0F00f1696218EaeFa2D2330Df3D6D1f94813b38f";
         var SEDO_REWARD_RATIO = 25/50;
         if(merge_mining_addresses.includes(SEDO_ADDRESS)){
           var  sedoTokenBalance = parseInt( minerRewardData.sedoTokenBalance );
           if( isNaN(sedoTokenBalance) )
           {
             sedoTokenBalance = 0;
           }
           sedoTokenBalance += tokensOwed * SEDO_REWARD_RATIO;
           var sedo_old_balance = minerRewardData.sedoTokenBalance;
           minerRewardData.sedoTokenBalance = sedoTokenBalance;
           minerRewardData.sedoReward = tokensOwed*SEDO_REWARD_RATIO;
           //minerData.shareCredits = 0; //wipe old shares
         }

         await this.saveMinerDataToRedis(minerAddress,minerRewardData)
         //make sure to update both data structures
         await this.saveMinerShareDataToRedis(minerAddress, minerShareData)


         //console.log('tokenBalance', minerData.tokenBalance)
         var rewardData = { "id": tx_hash, "minerAddress":minerAddress, 
         "previousTokenBalance":old_balance,
         "newTokenBalance" : newTokenBalance,
         "shares":miner_shares,
         "totalShares":total_shares,
         "tokensAwarded": minerRewardData.tokensAwarded,
         "reward":tokensOwed,
         "sedoTokenBalance":minerRewardData.sedoTokenBalance,
         "sedoReward":minerRewardData.sedoReward,
         "previousSedoTokenBalance":sedo_old_balance,

         "time": peerUtils.getUnixTimeNow()}

         await this.saveMinerRewardToRedis(minerAddress,rewardData) // append only reward data store


      //   var minerShares = minerData.

        }catch(e){
          
          console.log(e,minerData);
          
          }
      }


      //console.log('finished granting tokens owed ')


   },

   //need to know when one of our mining solutions SUCCEEDS
   // then we will start a new round and record tokens owed !
   checkTokenBalance()
   {



   },




  async  getShareCreditsFromDifficulty(difficulty,shareIsASolution)
   {

     var minShareDifficulty = this.getPoolMinimumShareDifficulty()  ;
     var miningDifficulty = parseFloat( await this.tokenInterface.getPoolDifficulty() ) ;

     if(shareIsASolution)//(difficulty >= miningDifficulty)
     {
       //if submitted a solution
      // return 10000;

      var amount = Math.floor( difficulty   ) ;
       //console.log('credit amt ', amount,minShareDifficulty,miningDifficulty )

       amount += SOLUTION_FINDING_BONUS;
       return amount;

     }else if(difficulty >= minShareDifficulty)
     {

       var amount = Math.floor(  difficulty    ) ;
       //console.log('credit amt ', amount,minShareDifficulty,miningDifficulty )
       return amount;
     }

     console.log('no shares for this solve!!',difficulty,minShareDifficulty)

     return 0;
   },


   async awardShareCredits( minerEthAddress, shareCredits )
   {

     //console.log('awarding shares : ' + shareCredits )
    
    
    //
    var minerData = await this.loadMinerShareDataFromRedis(minerEthAddress)

    if( minerData.shareCredits == null || isNaN(minerData.shareCredits)) minerData.shareCredits = 0
    if( shareCredits == null || isNaN(shareCredits)) shareCredits = 0




     minerData.shareCredits += parseInt(shareCredits);
     minerData.validSubmittedSolutionsCount += 1;
     minerData.lastSubmittedSolutionTime = peerUtils.getUnixTimeNow();

     //console.log( 'miner data - award shares ', minerEthAddress, JSON.stringify(minerData))

     await this.saveMinerShareDataToRedis(minerEthAddress,minerData)
   },

  async saveMinerRewardToRedis(minerEthAddress, rewardData)
  {
    this.redisInterface.pushToRedisList("miner_reward:"+minerEthAddress,JSON.stringify(rewardData));

  },
   async saveMinerDataToRedis(minerEthAddress, minerData)
   {
	var newPayments = await this.redisInterface.getOld2();
	//allow us to store miner data twice and hold it for safe records
	if(newPayments != 333)   
	{
		await this.redisInterface.storeRedisHashData("miner_data22", minerEthAddress , JSON.stringify(minerData))
		await this.redisInterface.storeRedisData('reloadAccountBalance', 2);
	}

	await this.redisInterface.storeRedisHashData("miner_data", minerEthAddress , JSON.stringify(minerData))

   },

   async saveMinerShareDataToRedis(minerEthAddress, minerData)
   {
     await this.redisInterface.storeRedisHashData("miner_share_data", minerEthAddress , JSON.stringify(minerData))

   },


   async loadMinerShareDataFromRedis(minerEthAddress)
   {
     var existingMinerDataJSON = await this.redisInterface.findHashInRedis("miner_share_data", minerEthAddress );

     if(existingMinerDataJSON == null)
   	  {
       existingMinerData = this.getDefaultMinerShareData();
     }else{
       existingMinerData = JSON.parse(existingMinerDataJSON)
     }

     return existingMinerData;
   },

   async loadMinerDataFromRedis(minerEthAddress)
   {
     var existingMinerDataJSON = await this.redisInterface.findHashInRedis("miner_data", minerEthAddress );

     if(existingMinerDataJSON == null)
     {
       existingMinerData = this.getDefaultMinerData();
     }else{
       existingMinerData = JSON.parse(existingMinerDataJSON)
     }

     return existingMinerData;
   },

   getDefaultMinerShareData(){
     return {
       shareCredits: 0,
       varDiff: 1, //default
       validSubmittedSolutionsCount: 0
     }
   },
   getDefaultMinerData(){
     return {
       shareCredits: 0,
       tokenBalance: 0, //what the pool owes
       tokensAwarded:0,
       varDiff: 1, //default
       validSubmittedSolutionsCount: 0
     }
   },


   async getTotalMinerHashrate()
   {
     var allMinerData = await this.getAllMinerData();


     var hashrateSum = 0;

     for(i in allMinerData)
     {
       try{
       var data = allMinerData[i].minerData

       var minerAddress = data.minerAddress;
       var minerHashrate = parseInt( data.hashRate );

        if(isNaN(minerHashrate)){
          minerHashrate = 0;
        }

       hashrateSum += minerHashrate;
       }catch(e){}
     }

     //console.log('got miner total hashRate in KHs', hashrateSum)
     return hashrateSum / 1000;

   },

   getTotalMinerShares(allMinerData)
   {

     var totalShares = 0;

     for(i in allMinerData)
     {
       try{
         var minerShares =allMinerData[i].shareCredits;
         totalShares += minerShares;
       }catch(e){console.log(e);}
     }

     //console.log('got miner total shares', totalShares)
     return totalShares;

   },

   async getMinerDataFull(minerEthAddress)
   {
     var minerDataJSON = await this.redisInterface.findHashInRedis("miner_data", minerEthAddress );
     var ret;

     try{
       ret= JSON.parse(minerDataJSON) ;
     }catch(e) { }
     if(!ret){
       ret = this.getDefaultMinerData();
     }
     var share_data = await this.getMinerShareData(minerEthAddress);
     for (var attrname in share_data) { ret[attrname] = share_data[attrname]; }
     return ret;
   },
   async getAllMinerDataFull()
   {

     var minerList =  await this.getMinerShareList()

     var results = [];

     for(i in minerList)
     {
       var minerAddress = minerList[i]
       var minerData = await this.getMinerData(minerAddress)
       var minerRewardData = await this.getMinerShareData(minerAddress)
       for (var attrname in minerRewardData) { minerData[attrname] = minerRewardData[attrname]; }
       results.push({minerAddress: minerAddress, minerData: minerData})
     }

     return results;
   },
   async getAllMinerData()
   {

     var minerList =  await this.getMinerShareList()
     var minerList2 = await this.getMinerList();
     var results = [];
     var lock = {};

     for(i in minerList)
     {
       var minerAddress = minerList[i]
       lock[minerAddress] = true;
       var minerData = await this.getMinerDataFull(minerAddress)
       results.push({minerAddress: minerAddress, minerData: minerData})
     }

     for(i in minerList2)
     {
       var minerAddress = minerList2[i]
       if(lock.minerAddress){continue;}
       lock[minerAddress] = true;
       var minerData = await this.getMinerDataFull(minerAddress)
       results.push({minerAddress: minerAddress, minerData: minerData})
     }
     return results;

   },
   async getMinerShareData(minerEthAddress)
   {

     var minerDataJSON = await this.redisInterface.findHashInRedis("miner_share_data", minerEthAddress );

     try{
     return JSON.parse(minerDataJSON) ;
     }catch(e){}

   },

   async getMinerData(minerEthAddress)
   {

     var minerDataJSON = await this.redisInterface.findHashInRedis("miner_data", minerEthAddress );
     var ret;

     try{
       ret= JSON.parse(minerDataJSON) ;
     }catch(e) { }

     if(ret) return ret;

     return this.getDefaultMinerData()

   },

   async getMinerShareList( )
   {
       var minerData = await this.redisInterface.getResultsOfKeyInRedis("miner_share_data" );

       return minerData;

   },

   async getMinerList( )
   {
       var minerData = await this.redisInterface.getResultsOfKeyInRedis("miner_data" );

       return minerData;

   },













  async initJSONRPCServer(port)
     {

       var self = this;

       //PROCESS_DIFFICULTY = 50105;
	PROCESS_DIFFICULTY = 56005;
       if(port == 8088){
         PROCESS_DIFFICULTY = 1024;
       }else if(port == 1){
         PROCESS_DIFFICULTY = 6*1024;
       }else if(port == 1225){
         PROCESS_DIFFICULTY = 8*1024;
       }else if(port == 9003){
         PROCESS_DIFFICULTY = 16*1024;
       }else if(port == 9004){
         PROCESS_DIFFICULTY = 2*1024;
       }else if(port == 9005){
         PROCESS_DIFFICULTY = 1024;
       }
		   //HASHRATE 202110
       console.log("DIFF:",port, PROCESS_DIFFICULTY);




       console.log('listening on JSONRPC server localhost:', port)
         // create a server
         var server = jayson.server({
           ping: function(args, callback) {

               callback(null, 'pong');

           },

          /* join: function(args, callback) {


                console.log('miner joining pool')

            //   var minerEthAddress = args[0];

            //   callback(null, self.addMinerToPool().toString() );

          },*/

           getPoolEthAddress: function(args, callback) {

               callback(null, self.getMintingAccount().helper.toString() );

           },

           getMinimumShareDifficulty: async function(args, callback) {

            var minerEthAddress = args[0];


            var varDiff = await self.getMinerVarDiff(minerEthAddress);


            callback(null, varDiff);


          },

          getMinimumShareTarget: async function(args, callback) {
            var minerEthAddress = args[0];

            var varDiff = await self.getMinerVarDiff(minerEthAddress);

            //always described in 'hex' to the cpp miner
            var minTargetBN = self.getPoolMinimumShareTarget( varDiff );

            //console.log('giving target ', minTargetBN , minTargetBN.toString(16) )
           callback(null,  minTargetBN.toString() );

         },
         getChallengeNumber: async function(args, callback) {

           var challenge_number = await self.redisInterface.loadRedisData('challengeNumber' )

           if(challenge_number != null)
           {
             challenge_number = challenge_number.toString()
           }
          callback(null, challenge_number );

        },
        getAllMiningParameters: async function(args, callback) {
          /* format of parameter from client:
          args = {
            'clientEthAddress': minerEthAddress,
            // 'clientWorkerName': minerWorkerName,
            'poolEthAddress': poolEthAddress,
            'challengeNumber': poolChallengeNumber,
            'shareTarget': poolMinimumShareTarget,
            'shareDifficulty': poolMinimumShareDifficulty
          }; 

          Any values in the args parameter which have changed pool-side will 
          be included in the response object. Values that are the same are
          omitted. If keys are completely omitted from the args object they will
          also be omitted from the response. 

          Note: If 'shareTarget' or 'shareDifficulty' keys are requested, the
          `clientEthAddress' key must be included. Otherwise it may be omitted. */

          let response = {};

          /* pool eth address */
          if ("poolEthAddress" in args) {
            let address = self.getMintingAccount().helper.toString();
            if(args.poolEthAddress != address) {
              response.poolEthAddress = address;
            }
          }

          /* challenge number */
          if ("challengeNumber" in args) {
            let challenge_number = await self.redisInterface.loadRedisData('challengeNumber');
            /* not 100% sure why this check is here, but it can't hurt to leave it */
            if(challenge_number!= null)
            {
              challenge_number = challenge_number.toString()
            }
            if(args.challengeNumber != challenge_number) {
              response.challengeNumber = challenge_number;
            }
          }

          /* difficulty */
          if ("shareDifficulty" in args) {
            let varDiff = await self.getMinerVarDiff(args.minerEthAddress);
            if(args.shareDifficulty != varDiff) {
              response.shareDifficulty = varDiff;
            }
          }

          /* share target */
          if ("shareTarget" in args) {
            let varDiff = await self.getMinerVarDiff(args.minerEthAddress);
            let share_target = self.getPoolMinimumShareTarget(varDiff).toString();
            if(args.shareTarget != share_target) {
              response.shareTarget = share_target;
            }          
          }

          callback(null, response);
        },



        submitShare: async function(args, callback) {
		//console.log("ARGS difficulty:", args[3]);
          var validJSONSubmit = true;

          var nonce = args[0];
          var minerEthAddress = args[1];
          var digest = args[2];
          var difficulty = args[3];
          var challenge_number = args[4];
	  
          if(
            difficulty == null  ||
            nonce == null  ||
            minerEthAddress == null  ||
            challenge_number == null  ||
            digest == null
          ) {
            validJSONSubmit = false;
          }


          var minShareDifficulty = self.getPoolMinimumShareDifficulty()  ;
          if( difficulty <  minShareDifficulty)
          {
            validJSONSubmit = false;
          }


          var poolEthAddress = self.getMintingAccount().helper;
          var poolChallengeNumber = await self.tokenInterface.getPoolChallengeNumber();

          var computed_digest =  web3utils.soliditySha3( poolChallengeNumber , poolEthAddress, nonce )


          var digestBigNumber = web3utils.toBN(digest);
          var claimedTarget = self.getTargetFromDifficulty( difficulty )
	
	//  console.log("CLAIMEDFUCKINGTARGET: ", web3utils.fromWei(claimedTarget, "ether"));
	  var tttt = digestBigNumber.gte(claimedTarget)

          if(computed_digest !== digest || digestBigNumber.gte(claimedTarget))
          {
            validJSONSubmit = false;
          }


          var ethBlock = await self.redisInterface.getEthBlockNumber();

          var shareData = {block: ethBlock ,nonce: nonce,minerEthAddress: minerEthAddress,challengeNumber: challenge_number,digest: digest,difficulty: difficulty};

          var response = await self.redisInterface.pushToRedisList("queued_shares_list", JSON.stringify(shareData));

	 
          callback(null,  validJSONSubmit );

          },



           getMinerData: async function(args, callback) {

             var minerEthAddress = args[0];
             var minerData = null;

             if(web3utils.isAddress(minerEthAddress.toString()) ){
                 minerData = await self.getMinerData(minerEthAddress);
             }else{
               console.log('getMinerData error: not a valid address')
             }

            callback(null, JSON.stringify( minerData )  );

          },
          getAllMinerData: async function(args, callback) {

            var minerData = await self.getAllMinerData();


           callback(null, JSON.stringify( minerData )  );

         },

         });

         server.http().listen(port);

     },



        async getAllTransactionData()
        {
          console.log("getAllTransactionData")

          var ethereumTransactionHashes = await this.redisInterface.getResultsOfKeyInRedis('active_transactions')

          var ethereumTransactions = [];

          for(i in ethereumTransactionHashes){
            var hash = ethereumTransactionHashes[i];
            console.log( 'hash',hash)

             var packetDataJSON = await this.redisInterface.findHashInRedis('active_transactions',hash);
             var packetData = JSON.parse(packetDataJSON)

             packetData.txHash = hash

            ethereumTransactions.push( packetData )
          }


          return ethereumTransactions;


        },


        async getPoolData()
        {
          return {
            tokenFee: this.poolConfig.poolTokenFee,
            mintingAddress: this.accountConfig.minting.address,
            paymentAddress: this.accountConfig.payment.address
          }
        },




        getMintingAccount()
        {
          return this.accountConfig.minting;
        },

        getPaymentAccount()
        {
          return this.accountConfig.payment;
        }
}
