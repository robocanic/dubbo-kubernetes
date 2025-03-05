/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package clog

import (
	"fmt"
	"github.com/apache/dubbo-kubernetes/operator/pkg/util/clog/log"
	"io"
	"os"
)

type ConsoleLogger struct {
	stdOut io.Writer
	stdErr io.Writer
	scope  *log.Scope
}

type Logger interface {
	LogAndPrint(v ...any)
	LogAndError(v ...any)
	LogAndFatal(v ...any)
	LogAndPrintf(format string, a ...any)
	LogAndErrorf(format string, a ...any)
	LogAndFatalf(format string, a ...any)
	Print(s string)
}

func NewConsoleLogger(stdOut, stdErr io.Writer, scope *log.Scope) *ConsoleLogger {
	s := scope
	if s == nil {
		s = log.RegisterScope(log.DefaultScopeName)
	}
	return &ConsoleLogger{
		stdOut: stdOut,
		stdErr: stdErr,
		scope:  s,
	}
}

func NewDefaultLogger() *ConsoleLogger {
	return NewConsoleLogger(os.Stdout, os.Stderr, nil)
}

func (l *ConsoleLogger) LogAndPrint(v ...any) {
	if len(v) == 0 {
		return
	}
	s := fmt.Sprint(v...)
	l.Print(s + "\n")
	l.scope.Infof(s)
}
func (l *ConsoleLogger) LogAndError(v ...any) {
	if len(v) == 0 {
		return
	}
	s := fmt.Sprint(v...)
	l.PrintErr(s + "\n")
	l.scope.Infof(s)
}
func (l *ConsoleLogger) LogAndFatal(a ...any) {
	l.LogAndError(a...)
	os.Exit(-1)
}
func (l *ConsoleLogger) LogAndPrintf(format string, a ...any) {
	s := fmt.Sprintf(format, a...)
	l.Print(s + "\n")
	l.scope.Infof(s)
}
func (l *ConsoleLogger) LogAndErrorf(format string, a ...any) {
	s := fmt.Sprintf(format, a...)
	l.PrintErr(s + "\n")
	l.scope.Infof(s)
}

func (l *ConsoleLogger) LogAndFatalf(format string, a ...any) {
	l.LogAndErrorf(format, a...)
	os.Exit(-1)
}

func (l *ConsoleLogger) Print(s string) {
	_, _ = l.stdOut.Write([]byte(s))
}

func (l *ConsoleLogger) PrintErr(s string) {
	_, _ = l.stdErr.Write([]byte(s))
}
