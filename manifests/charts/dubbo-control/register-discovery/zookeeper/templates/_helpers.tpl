{{/*
Return the appropriate apiVersion for deployment or statefulset.
*/}}
{{- define "apiVersion" -}}
{{- if and ($.Capabilities.APIVersions.Has "apps/v1") (semverCompare ">= 1.14-0" .Capabilities.KubeVersion.Version) }}
{{- print "apps/v1" }}
{{- else }}
{{- print "extensions/v1beta1" }}
{{- end }}
{{- end }}

{{/*
Return the ZooKeeper client-server authentication credentials secret.
*/}}
{{- define "zoo.client.secretName" -}}
{{- $zoo := .Values.registerCentre.zookeeper -}}
{{- if $zoo.auth.client.existingSecret -}}
    {{- printf "%s" (tpl $zoo.auth.client.existingSecret $) -}}
{{- else -}}
    {{- printf "%s-client-auth" (include "zoo.name" .) -}}
{{- end -}}
{{- end -}}

{{/*
Return the ZooKeeper server-server authentication credentials secret.
*/}}
{{- define "zoo.quorum.secretName" -}}
{{- $zoo := .Values.registerCentre.zookeeper -}}
{{- if $zoo.auth.quorum.existingSecret -}}
    {{- printf "%s" (tpl $zoo.auth.quorum.existingSecret $) -}}
{{- else -}}
    {{- printf "%s-quorum-auth" (include "zoo.name" .) -}}
{{- end -}}
{{- end -}}

{{/*
Return ZooKeeper Labels to use.
*/}}
{{- define "zoo.labels" -}}
app: {{ template "zoo.name" . }}
app.kubernetes.io/name: {{ template "zoo.name" . }}
app.kubernetes.io/instance: {{ template "zoo.name" . }}
app.kubernetes.io/component: {{ template "zoo.name" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}


{{/*
Return ZooKeeper matchLabels to use.
*/}}
{{- define "zoo.matchLabels" -}}
app.kubernetes.io/name: {{ template "zoo.name" . }}
app.kubernetes.io/instance: {{ template "zoo.name" . }}
app.kubernetes.io/component: {{ template "zoo.name" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Return ZooKeeper Name to use.
*/}}
{{- define "zoo.name" -}}
{{- printf "zookeeper" -}}
{{- end -}}

{{/*
Return Dubbo Namespace to use.
*/}}
{{- define "admin.namespace" -}}
{{- "dubbo-system" | default }}
{{- end }}

{{/*
Return ZooKeeper Service Selector to use.
*/}}
{{- define "zoo.selector" -}}
{{ include "zoo.name" . }}
{{- end -}}


{{/*
Return ZooKeeper Client Port to use.
*/}}
{{- define "zoo.client" -}}
{{- printf "2181" -}}
{{- end -}}

{{/*
Return ZooKeeper Follower Port to use.
*/}}
{{- define "zoo.follower" -}}
{{- printf "2888" -}}
{{- end -}}

{{/*
Return ZooKeeper Election Port to use.
*/}}
{{- define "zoo.election" -}}
{{- printf "3888" -}}
{{- end -}}
