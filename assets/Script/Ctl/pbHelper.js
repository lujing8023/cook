/**
 * Prefab 管理
 * 
 * 管理添加prefab
 */

// var prePath     = ""














/**
 * Prefab 管理辅助
 * 
 * 放一些不常用的prefab，常用的对象使用NPHelper管理
 */


/** 
 * Key  / Value , Name / Path
 * Path['Key'] = Value ;
 */
// var prePath      = 'prefabs/Dlgs/' ;
// var prePathGroup = 'prefabs/Dlgs/Group/' ;
// var prePathMJ    = 'prefabs/Dlgs/MJ/'    ;
// var prePathComs  = 'prefabs/coms/'
// var Paths   = {
//     DlgNotice               : prePath + 'DlgNotice'             ,
//     DlgNotice2              : prePath + 'DlgNotice2'             ,
//     DlgCreateRoom           : prePath + 'DlgCreateRoom'         ,
//     DlgJoinRoom             : prePath + 'DlgJoinRoom'           ,
//     DlgJoinRoom2            : prePath + 'DlgJoinRoom2'          ,
//     DlgViewRoom             : prePath + 'DlgViewRoom'           ,
//     DlgResult               : prePath + 'DlgResult'             ,
//     DlgResultFinal          : prePath + 'DlgResultFinal'        ,
//     DlgHistory              : prePath + 'DlgHistory'            ,
//     DlgPlayerInfo           : prePath + 'DlgPlayerInfo'         ,
//     DlgSetting              : prePath + 'DlgSetting'            , 
//     DlgChat                 : prePath + 'DlgChat'               , 
//     DlgHelp                 : prePath + 'DlgHelp'               , 
//     DlgAgent                : prePath + 'DlgAgent'              , 
//     DlgShare                : prePath + 'DlgShare'              , 
//     DlgCreatedRecords       : prePath + 'DlgCreatedRecords'     ,
//     DlgCreateSuccess        : prePath + 'DlgCreateSuccess'      ,
//     DlgInviteInfo           : prePath + 'DlgInviteInfo'         ,
//     DlgInviteMyList         : prePath + 'DlgInviteMyList'       ,
//     DlgInviteBind           : prePath + 'DlgInviteBind'         ,
//     DlgInviteCash           : prePath + 'DlgInviteCash'         ,
//     DlgBuyCard              : prePath + 'DlgBuyCard'            ,  // fucking iap
//     DlgCharge               : prePath + 'DlgCharge'             ,
//     DlgGameTips             : prePath + 'DlgGameTips'           ,
//     DlgRubCard              : prePath + 'DlgRubCard'            ,
//     DlgTurntable            : prePath + 'DlgTurntable'          ,
//     DlgGiveDiamonds         : prePath + 'DlgGiveDiamonds'       ,
//     DlgGiveDiamondsHistory  : prePath + 'DlgGiveDiamondsHistory',
//     DlgMails                : prePath + 'DlgMails'              ,
//     DlgGetItems             : prePath + 'DlgGetItems'           ,
//     DlgPhoneSignIn          : prePath + 'DlgPhoneSignIn'        ,
//     DlgRevisePassword       : prePath + 'DlgRevisePassword'    ,
//     DlgHeads                : prePath + 'DlgHeads'              ,
//     DlgWebView              : prePath + 'DlgWebView'            ,
//     DlgMyWallet             : prePath + 'DlgMyWallet'           ,
//     DlgWalletRecharge       : prePath + 'DlgWalletRecharge'     ,
//     DlgWalletWithdraw       : prePath + 'DlgWalletWithdraw'     ,
//     DlgWalletConvert        : prePath + 'DlgWalletConvert'      ,
//     DlgWalletToEth          : prePath + 'DlgWalletToEth'        ,
//     DlgShare2               : prePath + 'DlgShare2'             ,
//     DlgInvitationDetails    : prePath + 'DlgInvitationDetails'  ,
//     DlgService              : prePath + 'DlgService'            ,
//     DlgWalletRecordAll      : prePath + 'DlgWalletRecordAll'    ,
//     DlgWalletRecordIn       : prePath + 'DlgWalletRecordIn'     ,
//     DlgWalletRecordOut      : prePath + 'DlgWalletRecordOut'    ,
//     DlgGroupList            : prePathGroup + 'DlgGroupList'         ,
//     DlgGroupMain            : prePathGroup + 'DlgGroupMain'         ,
//     DlgGroupApply           : prePathGroup + 'DlgGroupApply'        ,
//     DlgGroupEditNotice      : prePathGroup + 'DlgGroupEditNotice'   ,
//     DlgGroupInvite          : prePathGroup + 'DlgGroupInvite'       ,
//     DlgGroupInvited         : prePathGroup + 'DlgGroupInvited'      ,
//     DlgGroupMatch           : prePathGroup + 'DlgGroupMatch'        ,
//     DlgGroupMatchRank       : prePathGroup + 'DlgGroupMatchRank'    ,
//     DlgGroupMembers         : prePathGroup + 'DlgGroupMembers'      ,
//     DlgGroupCreate          : prePathGroup + 'DlgGroupCreate'       ,
//     DlgGroupJoin            : prePathGroup + 'DlgGroupJoin'         ,
//     DlgGroupChangeScore     : prePathGroup + 'DlgGroupChangeScore'  ,
//     DlgGroupApply           : prePathGroup + 'DlgGroupApply'        ,
//     DlgGroupScoreHistory    : prePathGroup + 'DlgGroupScoreHistory' ,
//     DlgGroupBlacklist       : prePathGroup + 'DlgGroupBlacklist'    ,
//     DlgGroupSetting         : prePathGroup + 'DlgGroupSetting'      ,
//     DlgGroupFundSetting     : prePathGroup + 'DlgGroupFundSetting'  ,
//     DlgGroupFundRecords     : prePathGroup + 'DlgGroupFundRecords'  ,

//     DlgBindPhone            : prePath + 'DlgBindPhone'            ,

//     DlgMJResult             : prePathMJ + 'DlgMJResult'             ,
//     DlgMJResult2            : prePathMJ + 'DlgMJResult2'           ,
//     DlgMJTurntable          : prePathMJ + 'DlgMJTurntable'          ,
//     DlgMJCreateRoom         : prePathMJ + 'DlgMJCreateRoom'         ,
//     DlgMJResultFinal        : prePathMJ + 'DlgMJResultFinal'        ,
//     DlgMJDissolution        : prePathMJ + 'DlgMJDissolution'        ,
//     DlgMJDissolutionTrue    : prePathMJ + 'DlgMJDissolutionTrue'    ,
//     DlgMJRoomDetail         : prePathMJ + 'DlgMJRoomDetail'         ,
//     DlgMJHistory            : prePathMJ + 'DlgMJHistory'            ,
//     DlgMJHistoryVideo       : prePathMJ + 'DlgMJHistoryVideo'       ,
//     DlgMJHelp               : prePathMJ + 'DlgMJHelp'               ,
//     DlgMJAgent              : prePathMJ + 'DlgMJAgent'              ,
//     DlgMJPlayAgain          : prePathMJ + 'DlgMJPlayAgain'          ,
//     DlgMJHistoryView        : prePathMJ + 'DlgMJHistoryView'        ,
    
//     ComBadgeView            : prePathComs + 'ComBadgeView'          ,
// };

/**
 * addNode
 * 
 * Name , parentNode , cb(node)
 */
// module.exports.addNode = function( name , parent = null , cb = null , zorder = 9999 ){
//     module.exports.getNode( name , (node)=>{
//         if( parent === null ) parent = cc.director.getScene().getChildByName('Canvas');
//         if( parent.getChildByTag(zorder) ) parent.getChildByTag(zorder).destroy();
//         parent.addChild( node , zorder , zorder );
//         if( cb ) cb(node);
//     })
// }

/**
 * getNode
 * 
 * Name , cb(node)
 */
// module.exports.getNode = function( name , cb = null ){

//     let showLoading = gLoadingScene == null ;
//     let cbDone = cb ;
//     if( showLoading ){
//         cbDone = (node)=>{ 
//             MsgHelper.removeLoading();
//             if( cb ) cb(node);
//         }
//         MsgHelper.pushLoading();
//     }
//     CCLoaderHelper.getRes( Paths[name] , cc.Prefab , function ( err, res ) { 
//         let node =  cc.instantiate( cc.loader.getRes( Paths[name] ) ); 
//         if( cbDone ) cbDone(node);
//         return node ;
//     });
// }

/**
 * releaseNode - 会无脑释放该node引用的所有图片资源，如果有交叉资源的话，会很糟糕
 */
// module.exports.releaseNode = function( key = null ){
//     let _release = function( key ){
//         cc.log('@Release:' + key );
//         let deps = cc.loader.getDependsRecursively( Paths[key] );
//         cc.loader.release(deps);
//     }

//     if( key === null ){
//         for(let key in Paths){  
//             _release( key );
//         } 
//     }else{
//         _release( key );
//     } 
// };