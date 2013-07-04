#!/bin/bash
TEST_A=`./ghostdiff a.png b.png`
TEST_B=`./ghostdiff b.png c.png`
TEST_C=`./ghostdiff a.png c.png`

EXIT_STATUS=0;
if [[ $TEST_A == "not equal" ]] && [[ $TEST_B == "not equal" ]] && [[ $TEST_C == "equal" ]]; then
	echo "Pass"
	exit 0
else
	echo "Fail"
	exit 1
fi