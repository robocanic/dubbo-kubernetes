package cluster

import (
	"fmt"
	"github.com/apache/dubbo-kubernetes/dubboctl/pkg/cli"
	"github.com/apache/dubbo-kubernetes/pkg/kube"
	"github.com/spf13/cobra"
	"strings"
	"time"
)

type installArgs struct {
	Files            []string
	Sets             []string
	Revision         string
	ManifestPath     string
	SkipConfirmation bool
	ReadinessTimeout time.Duration
}

func (i *installArgs) String() string {
	var b strings.Builder
	b.WriteString("Files:    " + (fmt.Sprint(i.Files) + "\n"))
	b.WriteString("Sets:    " + (fmt.Sprint(i.Sets) + "\n"))
	b.WriteString("Revision:    " + (fmt.Sprint(i.Revision) + "\n"))
	b.WriteString("ManifestPath:    " + (fmt.Sprint(i.ManifestPath) + "\n"))
	return b.String()
}

func InstallCmd(ctx cli.Context) *cobra.Command {
	return InstallCmdWithArgs(ctx, &RootArgs{}, &installArgs{})
}

func InstallCmdWithArgs(ctx cli.Context, rootArgs *RootArgs, iArgs *installArgs) *cobra.Command {
	ic := &cobra.Command{
		Use:   "install",
		Short: "Applies an Dubbo manifest, installing or reconfiguring Dubbo on a cluster",
		Long:  "The install command generates an Dubbo install manifest and applies it to a cluster",
		Example: `# Apply a default dubboctl installation.
		dubboctl install
		# Apply a default profile.
		dubboctl install --profile=default`,
		Args: cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) error {
			kubeClient, err := ctx.CLIClient()
			if err != nil {
				return err
			}
			return install(kubeClient, rootArgs, iArgs)
		},
	}
	return ic
}

func install(kubeClient kube.CLIClient, rootArgs *RootArgs, iArgs *installArgs) error {
	return nil
}
