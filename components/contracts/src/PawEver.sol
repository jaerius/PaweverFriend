// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 컨트랙트
contract PawEverFriends {

    // 상태변수

    // 반려동물 구조체
    struct Pet {
        // 보증금
        uint256 deposit;
        // 보증 기간 (월단위)
        uint256 duration;
        // 남은 기간 (월단위)
        uint256 lefts;
        // 입양자 주소
        address adpoter;
        // 보호자 주소
        address guardian;
        // 상태 (0:입양대기, 1:보증기간, 2:보증만료, 3:환급중단)
        uint256 state;
    }

    // 펫 넘버 카운터: 총 등록 동물 수
    uint256 public petsCounter = 0;

    // 넘버-펫 구조체 매핑
    mapping(uint256 => Pet) public pets;

    // 보호자-등록펫넘버리스트 매핑
    mapping(address => uint256[]) public _petList1;

    // 입양자-입양펫넘버리스트 매핑
    mapping(address => uint256[]) public _petList2;


    // 함수

    // 1. 반려동물 등록 함수(보호자)
    function enroll(
        uint256 _deposit,     // 책임보증금 설정
        uint256 _duration     // 보증기간 설정
    ) public {
        // 펫 넘버 카운터 증가
        petsCounter += 1;
        // 펫 등록
        pets[petsCounter] = Pet(_deposit*1e16, _duration, _duration, address(0), msg.sender, 0);
        // 등록 펫리스트 추가
        _petList1[msg.sender].push(petsCounter);
    }

    // 2. 반려동물 입양하기 함수(입양자)
    function adopt(uint256 number) public payable {
        // 호출자가 보호자가 아니어야 함
        require(msg.sender != pets[number].guardian, "You are the guardian");
        // 현재 입양대기 상태여야 함
        require(pets[number].state == 0, "The pet already adopted");
        // 보증금만큼 밸류를 입력해야 함
        require(msg.value == pets[number].deposit, "Incorrect ether amount");

        // 입양자에 호출자 입력 
        pets[number].adpoter = msg.sender;
        // 보증기간 상태로 변경
        pets[number].state = 1;
        // 입양 펫리스트 추가
        _petList2[msg.sender].push(number);
    }

    receive() external payable {
    }

    // 3. 부분환급 함수(입양자)
    function refund(uint256 number) public {
        // 환급자
        address payable adpoter = payable(msg.sender);
        // 마지막 환급 일자
        uint256 lastTransferTimestamp;
        // 월 단위
        //uint256 interval = 30 days;

        // 호출자가 입양자여야 함
        require(msg.sender == pets[number].adpoter, "You are not the adpoter");
        // 현재 보증기간이어야 함
        require(pets[number].state == 1);
        // 마지막 환급일자로부터 한달 이상이 지나야 함
        //require(block.timestamp >= lastTransferTimestamp + interval, "It's not time yet");

        // if 약정 마지막 달이면, 원금의 나머지 30% 환급
        if (pets[number].lefts == 1) {

            // 마지막 달에 환불해야하는 금액
            uint256 lastRefunds  = pets[number].deposit * 3 / 10;

            // 컨트랙트의 잔액이 충분한지 확인
            require(address(this).balance >= lastRefunds, "Insufficient balance");

            // 원금의 30% 환급
            adpoter.transfer(lastRefunds);

            // 보증기간만료
            pets[number].state = 2;

        // else 매달 원금의 70%의 n등분 환급
        } else {  

            // 매달 환불해야하는 금액
            uint256 monthlyRefunds = (pets[number].deposit * 7 / 10) / (pets[number].duration - 1);

            // 컨트랙트의 잔액이 충분한지 확인
            require(address(this).balance >= monthlyRefunds, "Insufficient balance");
        
            // 매달 환급
            adpoter.transfer(monthlyRefunds);

            // 마지막 환급일자 갱신
            lastTransferTimestamp = block.timestamp;
        }

        // 남은 약정월수 차감
        pets[number].lefts -= 1;
    }

    // 4. 보증금 환급 중단 함수(보호자)
    function stopRefunding(uint256 number) public {
        // 호출자가 보호자여야 함
        require(msg.sender == pets[number].guardian, "You are not the guardian");
        // 현재 보증기간이어야 함
        require(pets[number].state == 1);
        // 환급 중단
        pets[number].state = 3;
    }

    // 5. 보증금 환급 재개 함수(보호자)
    function restartRefunding(uint256 number) public {
        // 호출자가 보호자여야 함
        require(msg.sender == pets[number].guardian, "You are not the guardian");
        // 현재 환급중단상태이어야 함
        require(pets[number].state == 3);
        // 환급 재개
        pets[number].state = 1;
    }
}