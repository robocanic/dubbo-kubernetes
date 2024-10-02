#!/usr/bin/env bash

# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

host_computer=$1
host_name=$2
host_pass=$3

if [ $# -lt 3 ]; then
  echo "ERROR: The expected value is parameter 3, but there are only $#: input parameters."
  exit 1
fi

for i in $host_computer; do
    sshpass -p$host_pass ssh -o "StrictHostKeyChecking=no" "$host_name"@$i "echo $host_pass | sudo -S reboot"
done